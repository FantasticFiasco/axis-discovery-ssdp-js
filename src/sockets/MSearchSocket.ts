import * as dgram from 'dgram';

import { log } from '../logging/Log';
import { SSDP_MULTICAST_ADDRESS, SSDP_PORT } from './Constants';
import { Message } from './Message';
import { MSearch } from './MSearch';
import { SocketBase } from './SocketBase';

/**
 * Class representing a SSDP socket that support the HTTP method M-SEARCH.
 */
export class MSearchSocket extends SocketBase {
    /**
     * @param address The network address to listen for M-SEARCH responses on.
     */
    constructor(private address: string) {
        super();
    }

    /**
     * Starts a search by using HTTP method M-SEARCH.
     */
    public search(): Promise<void> {
        log('MSearchSocket#search - %s', this.address);

        const message = new MSearch().toBuffer();

        return new Promise<void>((resolve, reject) => {
            this.socket.send(
                message,
                0,
                message.length,
                SSDP_PORT,
                SSDP_MULTICAST_ADDRESS,
                (error: Error) => {
                    if (error) {
                        log('MSearchSocket#search - %o', error);
                        reject(error);
                    } else {
                        resolve();
                    }
                },
            );
        });
    }

    protected onListening() {
        log('MSearchSocket#onListening - %s:%d', this.socket.address().address, this.socket.address().port);
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
