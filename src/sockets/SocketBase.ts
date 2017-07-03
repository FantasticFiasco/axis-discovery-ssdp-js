import * as expect from '@fantasticfiasco/expect';
import * as dgram from 'dgram';
import * as events from 'events';

import { log } from '../logging/Log';

export abstract class SocketBase extends events.EventEmitter {

    protected socket: dgram.Socket;

    /**
     * Start listen for advertisements.
     */
    public async start(): Promise<void> {
        expect.toNotExist(this.socket, 'M-SEARCH socket has already been started');

        this.socket = dgram.createSocket({ type: 'udp4', reuseAddr: true });
        this.socket.on('listening', () => this.onListening());
        this.socket.on('message', (message: Buffer, remote: dgram.AddressInfo) => this.onMessage(message, remote));
        this.socket.on('error', (error: Error) => this.onError(error));

        await this.bind();
    }

    /**
     * Stop listen for advertisements.
     */
    public stop(): Promise<void> {
        expect.toExist(this.socket, 'M-SEARCH socket has never been started');

        return new Promise<void>((resolve) => {
            this.socket.close(() => resolve());
        });
    }

    protected abstract onListening(): void;

    protected abstract onMessage(messageBuffer: Buffer, remote: dgram.AddressInfo): void;

    protected abstract bind(): Promise<void>;

    protected onError(error: Error) {
        log(`Socket error: ${error}`);
    }
}
