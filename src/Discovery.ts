import * as expect from '@fantasticfiasco/expect';
import * as events from 'events';

import { Device } from './';
import { log } from './logging';
import { getIPv4Addresses } from './network-interfaces';
import { DefaultHttpRequest, IOptions } from './options';
import { mapFromRootDescription, RootDescriptionRequest } from './root-descriptions';
import { mapFromMessage, Message, MSearchSocket, NotifySocket, SocketBase } from './sockets';

/**
 * Class responsible for discovering Axis cameras on the network.
 */
export class Discovery {

    private readonly options: IOptions;
    private readonly eventEmitter = new events.EventEmitter();
    private sockets?: SocketBase[];

    constructor(options?: IOptions) {
        this.options = options || {};
    }

    /**
     * Start listen for device advertisements on all network interface
     * addresses.
     */
    public async start(): Promise<void> {
        expect.toNotExist(this.sockets, 'Discovery has already been started');

        log('Discovery#start');

        await this.setup();
    }

    /**
     * Stop listening for device advertisements.
     */
    public async stop(): Promise<void> {
        expect.toExist(this.sockets, 'Discovery has not been started');

        log('Discovery#stop');

        await this.teardown();
    }

    /**
     * Triggers a new search for devices on the network.
     */
    public async search(): Promise<void> {
        expect.toExist(this.sockets, 'Discovery has not been started');

        log('Discovery#search');

        for (const socket of this.sockets!) {
            if (socket instanceof MSearchSocket) {
                await socket.search();
            }
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

    private async setup(): Promise<void> {
        this.sockets = [];
        const addresses = getIPv4Addresses();
        log('Discovery#setup - interface addresses: %o', addresses);

        // Passive SSDP
        await this.setupSocket(new NotifySocket(addresses));

        // Active SSDP
        for (const address of addresses) {
            await this.setupSocket(new MSearchSocket(address));
        }
    }

    private async setupSocket(socket: SocketBase): Promise<void> {
        this.sockets!.push(socket);
        socket.on('hello', (message: Message) => this.onHelloMessage(message));
        socket.on('goodbye', (message: Message) => this.onGoodbyeMessage(message));
        await socket.start();
    }

    private async teardown(): Promise<void> {
        for (const socket of this.sockets!) {
            this.teardownSocket(socket);
        }

        this.sockets = undefined;
    }

    private async teardownSocket(socket: SocketBase): Promise<void> {
        socket.removeAllListeners('hello');
        socket.removeAllListeners('goodbye');
        await socket.stop();
    }

    private onHelloMessage(message: Message) {
        log('Discovery#onHelloMessage - %s', message.remoteAddress);

        const device = mapFromMessage(message);
        if (device) {
            // Emit initial hello
            this.eventEmitter.emit('hello', device);

            // Request root description
            this.requestRootDescription(message.remoteAddress, message.location);
        } else {
            log('Discovery#onHelloMessage - ignore %s since mapping was unsuccessful', message.remoteAddress);
        }
    }

    private onGoodbyeMessage(message: Message) {
        log('Discovery#onGoodbyeMessage - %s', message.remoteAddress);

        const device = mapFromMessage(message);
        if (device) {
            this.eventEmitter.emit('goodbye', device);
        } else {
            log('Discovery#onGoodbyeMessage - ignore %s since mapping was unsuccessful', message.remoteAddress);
        }
    }

    private async requestRootDescription(remoteAddress: string, location: string): Promise<void> {
        try {
            const httpRequest = this.options.httpRequest || new DefaultHttpRequest();
            const rootDescriptionRequest = new RootDescriptionRequest(remoteAddress, location, httpRequest);
            const rootDescription = await rootDescriptionRequest.send();
            const device = mapFromRootDescription(rootDescription);
            this.eventEmitter.emit('hello', device);
        } catch (error) {
            log('Discovery#requestRootDescription - %o', error);
        }
    }
}
