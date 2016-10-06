import * as _ from 'lodash';
import { BindOptions, createSocket, Socket } from 'dgram';
import { EventEmitter } from 'events';

import { SSDP_MULTICAST_ADDRESS, SSDP_PORT } from '../network/Constants';

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
				this.socket.addMembership(SSDP_MULTICAST_ADDRESS, address);
			})
	    });

		this.socket.on('message', (message, remote) => {
			console.log(`NOTIFY from ${remote.address}\r\n${message.toString()}`);
    	});

		this.socket.on('error', error => {
      		console.log('Socket error', error);
    	});

		this.socket.bind(SSDP_PORT);
	}
}