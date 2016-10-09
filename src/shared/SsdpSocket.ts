import { EventEmitter } from 'events';
import { AddressInfo, BindOptions, createSocket, Socket } from 'dgram';

/**
 * Abstract class acting as a SSDP socket.
 */
export abstract class SsdpSocket extends EventEmitter {

    protected socket: Socket;

    /**
     * Start listen for advertisements.
     */
    start() {
        this.assertNotStarted();

        this.socket = createSocket({ type: 'udp4', reuseAddr: true });
        this.socket.on('listening', () => this.onListening());
        this.socket.on('message', (message: Buffer, remote: AddressInfo) => this.onMessage(message, remote));
        this.socket.on('error', (error: Error) => this.onError(error));
        this.bind();
    }

    protected abstract onListening(): void;

    protected abstract onMessage(message: Buffer, remote: AddressInfo): void;

    protected abstract bind(): void;

    protected onError(error: Error) {
        console.log('Socket error', error);
    }

    private assertNotStarted() {
        if (this.socket != null) {
            throw 'M-SEARCH socket has already been started';
        }
    }
}
