import * as dgram from 'dgram';

import { log } from '../logging/Log';
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
    public search(): Promise<void> {
        const message = new MSearch().toBuffer();

        return new Promise<void>((resolve, reject) => {
            this.socket.send(
                message,
                0,
                message.length,
                constants.SSDP_PORT,
                constants.SSDP_MULTICAST_ADDRESS,
                (error: Error) => {
                    if (error) {
                        log(`Socket error: ${error}`);
                        reject(error);
                    } else {
                        resolve();
                    }
                },
            );
        });
    }

    protected onListening() {
        const address = this.socket.address();
        log(`M-SEARCH socket is now listening on ${address.address}:${address.port}`);
    }

    protected onMessage(messageBuffer: Buffer, remote: dgram.AddressInfo) {
        const message = new Message(remote.address, messageBuffer);

        if (message.method !== 'HTTP/1.1 200 OK') {
            return;
        }

        this.emit('hello', message);
    }

    protected bind(): Promise<void> {
        return new Promise<void>((resove) => {
            this.socket.bind(undefined, this.address, () => resove());
        });
    }
}
