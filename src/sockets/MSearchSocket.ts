import * as dgram from 'dgram';

import { Log } from '../Log';
import * as constants from './Constants';
import { Message } from './Message';
import { MSearch } from './MSearch';
import { SocketBase } from './SocketBase';

/**
 * Class representing a SSDP socket that support the HTTP method M-SEARCH.
 */
export class MSearchSocket extends SocketBase {
    /**
     * @address The network address to listen for M-SEARCH responses on.
     */
    constructor(private address: string) {
        super();
    }

    /**
     * Starts a search by using HTTP method M-SEARCH.
     */
    public search() {
        const message = new MSearch().toBuffer();
        this.socket.send(
            message,
            0,
            message.length,
            constants.SSDP_PORT,
            constants.SSDP_MULTICAST_ADDRESS);
    }

    protected onListening() {
        const address = this.socket.address();
        Log.write(`M-SEARCH socket is now listening on ${address.address}:${address.port}`);

        // Trigger a search when socket is ready
        this.search();
    }

    protected onMessage(messageBuffer: Buffer, remote: dgram.AddressInfo) {
        const message = new Message(remote.address, messageBuffer);

        if (message.method !== 'HTTP/1.1 200 OK') {
            return;
        }

        this.emit('hello', message);
    }

    protected bind() {
        this.socket.bind(undefined, this.address);
    }
}
