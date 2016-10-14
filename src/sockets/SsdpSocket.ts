import * as events from 'events';
import * as dgram from 'dgram';

/**
 * Abstract class acting as a SSDP socket.
 */
export abstract class SsdpSocket extends events.EventEmitter {

    protected socket: dgram.Socket;

    /**
     * Start listen for advertisements.
     */
    start() {
        this.assertNotStarted();

        this.socket = dgram.createSocket({ type: 'udp4', reuseAddr: true });
        this.socket.on('listening', () => this.onListening());
        this.socket.on('message', (message: Buffer, remoteAddress: string) => this.onMessage(message, remoteAddress));
        this.socket.on('error', (error: Error) => this.onError(error));
        this.bind();
    }

    protected abstract onListening(): void;

    protected abstract onMessage(message: Buffer, remoteAddress: string): void;

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
