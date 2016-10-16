import * as dgram from 'dgram';
import * as _ from 'lodash';

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
        const address = this.socket.address();
        Log.write(`NOTIFY socket is now listening on ${address.address}:${address.port}`);

        _.forEach(this.addresses, address => {
            this.socket.addMembership(constants.SSDP_MULTICAST_ADDRESS, address);
        });
    }

    protected onMessage(messageBuffer: Buffer, remote: dgram.AddressInfo) {
        const message = new Message(remote.address, messageBuffer);

        if (message.method !== 'NOTIFY * HTTP/1.1' ||
            message.nt !== 'urn:axis-com:service:BasicService:1') {
            return;
        }

        if (message.nts === 'ssdp:alive') {
            this.emit('hello', message);
        }
        else if (message.nts === 'ssdp:byebye') {
            this.emit('goodbye', message);
        }
    }

    protected bind() {
        this.socket.bind(constants.SSDP_PORT);
    }
}
