import * as events from 'events';
import * as _ from 'lodash';

import { NetworkInterfaceMonitor } from './network-interfaces/NetworkInterfaceMonitor';
import { RootDescriptionRequest } from './root-description/RootDescriptionRequest';
import { MSearchSocket } from './sockets/MSearchSocket';
import { NotifySocket } from './sockets/NotifySocket';
import { Message } from './sockets/Message';
import { SocketBase } from './sockets/SocketBase';
import { DeviceMapper } from './DeviceMapper';
import { Log } from './Log';

export class Discovery extends events.EventEmitter {

    private readonly sockets = new Array<SocketBase>();
    private readonly networkInterfaceMonitor = new NetworkInterfaceMonitor();
    private readonly deviceMapper = new DeviceMapper();

    /**
     * Start listen for SSDP advertisements on all network interface addresses.
     */
    start() {
        const addresses = this.networkInterfaceMonitor.getIPv4Addresses();

        // Start passive SSDP
        this.startSocket(new NotifySocket(addresses));

        // Start active SSDP
        _.forEach(addresses, address => this.startSocket(new MSearchSocket(address)));
    }

    /**
     * Starts a search by using HTTP method M-SEARCH.
     */
    search() {
        _.chain(this.sockets)
            .filter(socket => socket instanceof MSearchSocket)
            .map(socket => <MSearchSocket>socket)
            .forEach(socket => socket.search());
    }

    private startSocket(socket: SocketBase) {
        this.sockets.push(socket);
        socket.on('hello', (message: Message) => this.onHello(message));
        socket.on('goodbye', (message: Message) => this.onGoodbye(message));
        socket.start();
    }

    private onHello(message: Message) {
        // Emit initial hello
        this.emit('hello', this.deviceMapper.fromMessage(message));

        // Request root description
        this.requestRootDescriptionAsync(message.remoteAddress, message.location);
    }

    private onGoodbye(message: Message) {
        this.emit('goodbye', this.deviceMapper.fromMessage(message));
    }

    private async requestRootDescriptionAsync(remoteAddress: string, location: string): Promise<void> {
        try {
            const request = new RootDescriptionRequest(remoteAddress, location);
            const rootDescription = await request.sendAsync();
            const device = await this.deviceMapper.fromRootDescriptionAsync(rootDescription);
            this.emit('hello', device);
        } catch (e) {
            Log.write(`Unable to get root description. ${e}`);
        }
    }
}
