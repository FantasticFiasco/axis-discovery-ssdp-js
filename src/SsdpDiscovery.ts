import * as _ from 'lodash';
import * as events from 'events';

import { NetworkInterfaces } from './network-interfaces/NetworkInterfaces';
import { MSearchSocket } from './ssdp/MSearchSocket';
import { NotifySocket } from './ssdp/NotifySocket';
import { RootDescriptionRequest } from './ssdp/RootDescriptionRequest';
import { SsdpMessage } from './ssdp/SsdpMessage';
import { SsdpSocket } from './ssdp/SsdpSocket';
import { Device } from './Device';

export class SsdpDiscovery extends events.EventEmitter {

    private readonly sockets = new Array<SsdpSocket>();
    private readonly networkInterfaces = new NetworkInterfaces();

    /**
     * Start listen for SSDP advertisements on all network interface addresses.
     */
    start() {
        const addresses = this.networkInterfaces.getIPv4Addresses();

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

    private startSocket(socket: SsdpSocket) {
        this.sockets.push(socket);
        socket.on('hello', (ssdpMessage: SsdpMessage) => this.onHello(ssdpMessage));
        socket.on('goodbye', (ssdpMessage: SsdpMessage) => this.onGoodbye(ssdpMessage));
        socket.start();
    }

    private async onHello(ssdpMessage: SsdpMessage) {
        // Emit initial hello
        this.emit('hello', Device.mapFromSsdpMessage(ssdpMessage));

        // Get root description and emit new 'hello' when we know more about the device
        const request = new RootDescriptionRequest(ssdpMessage.location);
        const device = await request.sendAsync();
        this.emit('hello', device);
    }

    private onGoodbye(ssdpMessage: SsdpMessage) {
        this.emit('goodbye', Device.mapFromSsdpMessage(ssdpMessage));
    }
}
