import * as _ from 'lodash';
import { AddressInfo } from 'dgram';

import { Constants } from '../shared/Constants';
import { SsdpMessage } from './SsdpMessage';
import { SsdpSocket } from './SsdpSocket';

/**
 * Class representing a SSDP socket that support the HTTP method NOTIFY.
 */
export class NotifySocket extends SsdpSocket {
    /**
     * @addresses The network addresses to listen for NOTIFY advertisements on.
     */
    constructor(private readonly addresses: string[]) {
        super();
    }

    protected onListening() {
        const address = this.socket.address();
        console.log(`NOTIFY socket is now listening on ${address.address}:${address.port}`);

        _.forEach(this.addresses, address => {
            this.socket.addMembership(Constants.SSDP_MULTICAST_ADDRESS, address);
        });
    }

    protected onMessage(message: Buffer, remote: AddressInfo) {
        const ssdpMessage = new SsdpMessage(remote, message);

        if (ssdpMessage.method !== 'NOTIFY * HTTP/1.1' ||
            ssdpMessage.nt !== 'urn:axis-com:service:BasicService:1') {
            return;
        }

        if (ssdpMessage.nts === 'ssdp:alive') {
            this.emit('hello', ssdpMessage);
        }
        else if (ssdpMessage.nts === 'ssdp:byebye') {
            this.emit('goodbye', ssdpMessage);
        }
    }

    protected bind() {
        this.socket.bind(Constants.SSDP_PORT);
    }
}
