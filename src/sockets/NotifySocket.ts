import * as dgram from 'dgram';

import { log } from '../logging/Log';
import { SSDP_MULTICAST_ADDRESS, SSDP_PORT } from './Constants';
import { Message } from './Message';
import { SocketBase } from './SocketBase';

/**
 * Class representing a SSDP socket that support the HTTP method NOTIFY.
 */
export class NotifySocket extends SocketBase {
    /**
     * @param addresses The network addresses to listen for NOTIFY
     * advertisements on.
     */
    constructor(private readonly addresses: string[]) {
        super();
    }

    protected onListening() {
        log('NotifySocket#onListening - %s:%d', this.socket.address().address, this.socket.address().port);

        for (const address of this.addresses) {
            log('NotifySocket#onListening - add membership to %s', address);
            this.socket.addMembership(SSDP_MULTICAST_ADDRESS, address);
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
            this.socket.bind(SSDP_PORT, undefined, () => resolve());
        });
    }
}
