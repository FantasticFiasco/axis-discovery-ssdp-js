import { BindOptions, createSocket, Socket } from 'dgram';
import { EventEmitter } from 'events';

import { Constants } from '../shared/Constants';
import { Message } from '../shared/Message';
import { MSearch } from './MSearch';

/**
 * Class representing a SSDP socket that support the HTTP method M-SEARCH.
 */
export class MSearchSocket extends EventEmitter {

	private socket: Socket;

	/**
	 * Start listening for M-SEARCH responses on specified network interface address.
	 * @address The network address to start listening for M-SEARCH responses on.
	 */
	startOn(address: string) {
		if (this.socket != null) {
			throw 'Socket has already been started on an address'
		}

		this.socket = createSocket({ type: 'udp4', reuseAddr: true });

		this.socket.on('listening', () => {
			const address = this.socket.address();
      		console.log(`M-SEARCH socket is now listening on ${address.address}:${address.port}`);

			// Trigger a search when socket is ready
			this.search();
	    });

		this.socket.on('message', (message, remote) => {
			const device = new Message(remote.address, remote.port, remote.family, message)
				.mapToDevice();

			this.emit('hello', device);
    	});

		this.socket.on('error', error => {
      		console.log('Socket error', error);
    	});

		this.socket.bind(undefined, address);
	}

	/**
	 * Starts a search by using HTTP method M-SEARCH.
	 */
	search() {
		const message = new MSearch().toBuffer();
		this.socket.send(
			message,
			0,
			message.length,
			Constants.SSDP_PORT,
			Constants.SSDP_MULTICAST_ADDRESS);
	}
}
