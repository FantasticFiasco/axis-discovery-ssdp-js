import * as _ from 'lodash';
import { BindOptions, createSocket, Socket } from 'dgram';
import { EventEmitter } from 'events';

import { Constants } from '../shared/Constants';
import { Message } from '../shared/Message';

/**
 * Class representing a SSDP socket that support the HTTP method NOTIFY.
 */
export class NotifySocket extends EventEmitter {

	private socket: Socket;

	/**
	 * Start listen for NOTIFY advertisements on specified network interface addresses.
	 * @addresses The network addresses to start listening for NOTIFY advertisements on.
	 */
	startOn(addresses: string[]) {
		if (this.socket != null) {
			throw 'Socket has already been started on an address'
		}

		this.socket = createSocket({ type: 'udp4', reuseAddr: true });

		this.socket.on('listening', () => {
			const address = this.socket.address();
      		console.log(`NOTIFY socket is now listening on ${address.address}:${address.port}`);

			_.forEach(addresses, address => {
				this.socket.addMembership(Constants.SSDP_MULTICAST_ADDRESS, address);
			})
	    });

		this.socket.on('message', (message, remote) => {
			const notifyMessage = new Message(remote.address, remote.port, remote.family, message);

			if (notifyMessage.method != 'NOTIFY * HTTP/1.1' ||
				notifyMessage.getHeaderValue('NT') != 'urn:axis-com:service:BasicService:1') {
				return;
			}
			
			const device = notifyMessage.mapToDevice();
			const nts = notifyMessage.getHeaderValue('NTS');

			if (nts === 'ssdp:alive') {
				this.emit('hello', device);
			}
			else if (nts === 'ssdp:byebye') {
				this.emit('goodbye', device);
			}
    	});

		this.socket.on('error', error => {
      		console.log('Socket error', error);
    	});

		this.socket.bind(Constants.SSDP_PORT);
	}
}