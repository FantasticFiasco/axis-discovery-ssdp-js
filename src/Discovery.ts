import * as events from 'events';
import * as _ from 'lodash';

import { Device } from './';
import { log } from './logging/Log';
import { mapFromMessage, mapFromRootDescription } from './mappings/Mappings';
import { NetworkInterfaceMonitor } from './network-interfaces/NetworkInterfaceMonitor';
import { RootDescriptionRequest } from './root-descriptions/RootDescriptionRequest';
import { Message } from './sockets/Message';
import { MSearchSocket } from './sockets/MSearchSocket';
import { NotifySocket } from './sockets/NotifySocket';
import { SocketBase } from './sockets/SocketBase';

/**
 * Class responsible for discovering Axis cameras on the network.
 */
export class Discovery {

    private readonly sockets = new Array<SocketBase>();
    private readonly networkInterfaceMonitor = new NetworkInterfaceMonitor();
    private readonly eventEmitter = new events.EventEmitter();

    /**
     * Start listen for device advertisements on all network interface
     * addresses.
     */
    public async start(): Promise<void> {
        const addresses = this.networkInterfaceMonitor.getIPv4Addresses();

        // Start passive SSDP
        await this.startSocket(new NotifySocket(addresses));

        // Start active SSDP
        for (const address of addresses) {
            await this.startSocket(new MSearchSocket(address));
        }
    }

    /**
     * Stop listening for device advertisements.
     */
    public async stop(): Promise<void> {
        for (const socket of this.sockets.splice(0, this.sockets.length)) {
            await socket.stop();
        }
    }

    /**
     * Triggers a new search for devices on the network.
     */
    public async search(): Promise<void> {
        const mSearchSockets = _.chain(this.sockets)
            .filter((socket) => socket instanceof MSearchSocket)
            .map((socket) => socket as MSearchSocket)
            .value();

        for (const mSearchSocket of mSearchSockets) {
            await mSearchSocket.search();
        }
    }

    /**
     * Register a callback that is invoked when a device is found on the
     * network.
     */
    public onHello(callback: (device: Device) => void) {
        this.eventEmitter.on('hello', (device: Device) => callback(device));
    }

    /**
     * Register a callback that is invoked when a device intentionally is
     * disconnecting from the network.
     */
    public onGoodbye(callback: (device: Device) => void) {
        this.eventEmitter.on('goodbye', (device: Device) => callback(device));
    }

    private async startSocket(socket: SocketBase): Promise<void> {
        this.sockets.push(socket);
        socket.on('hello', (message: Message) => this.onHelloMessage(message));
        socket.on('goodbye', (message: Message) => this.onGoodbyeMessage(message));
        await socket.start();
    }

    private onHelloMessage(message: Message) {
        // Emit initial hello
        this.eventEmitter.emit('hello', mapFromMessage(message));

        // Request root description
        this.requestRootDescription(message.remoteAddress, message.location);
    }

    private onGoodbyeMessage(message: Message) {
        this.eventEmitter.emit('goodbye', mapFromMessage(message));
    }

    private async requestRootDescription(remoteAddress: string, location: string): Promise<void> {
        try {
            const request = new RootDescriptionRequest(remoteAddress, location);
            const rootDescription = await request.send();
            const device = mapFromRootDescription(rootDescription);
            this.eventEmitter.emit('hello', device);
        } catch (error) {
            log(`Unable to get root description. ${error}`);
        }
    }
}
