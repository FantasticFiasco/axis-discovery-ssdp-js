import * as dgram from 'dgram';
import * as events from 'events';

import { Log } from '../Log';

/**
 * Abstract class acting as a SSDP socket.
 */
export abstract class SocketBase extends events.EventEmitter {

    protected socket: dgram.Socket;

    /**
     * Start listen for advertisements.
     */
    public start() {
        this.assertNotStarted();

        this.socket = dgram.createSocket({ type: 'udp4', reuseAddr: true });
        this.socket.on('listening', () => this.onListening());
        this.socket.on('message', (message: Buffer, remote: dgram.AddressInfo) => this.onMessage(message, remote));
        this.socket.on('error', (error: Error) => this.onError(error));
        this.bind();
    }

    protected abstract onListening(): void;

    protected abstract onMessage(messageBuffer: Buffer, remote: dgram.AddressInfo): void;

    protected abstract bind(): void;

    protected onError(error: Error) {
        Log.write(`Socket error: ${error}`);
    }

    private assertNotStarted() {
        if (this.socket != null) {
            throw 'M-SEARCH socket has already been started';
        }
    }
}
