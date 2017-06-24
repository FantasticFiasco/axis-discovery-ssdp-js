import * as dgram from 'dgram';

import { Log } from '../Log';
import * as constants from './Constants';
import { Message } from './Message';
import { SocketBase } from './SocketBase';

/**
 * Class representing a SSDP socket that support the HTTP method NOTIFY.
 */
export class NotifySocket extends SocketBase {
    /**
     * @addresses The network addresses to listen for NOTIFY advertisements on.
     */
    constructor(private readonly addresses: string[]) {
        super();
    }

    protected onListening() {
        Log.write(`NOTIFY socket is now listening on ${this.socket.address().address}:${this.socket.address().port}`);

        for (const address of this.addresses) {
            this.socket.addMembership(constants.SSDP_MULTICAST_ADDRESS, address);
        }
    }

    protected onMessage(messageBuffer: Buffer, remote: dgram.AddressInfo) {
        const message = new Message(remote.address, messageBuffer);

        if (message.method !== 'NOTIFY * HTTP/1.1' ||
            message.nt !== 'urn:axis-com:service:BasicService:1') {
            return;
        }

        if (message.nts === 'ssdp:alive') {
            this.emit('hello', message);
        } else if (message.nts === 'ssdp:byebye') {
            this.emit('goodbye', message);
        }
    }

    protected bind(): Promise<void> {
        return new Promise<void>((resolve) => {
            this.socket.bind(constants.SSDP_PORT, undefined, () => resolve());
        });
    }
}
