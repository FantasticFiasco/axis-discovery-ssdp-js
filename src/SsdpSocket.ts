import { BindOptions, createSocket, Socket } from 'dgram';

import { SSDP_MULTICAST_ADDRESS, SSDP_PORT } from './Constants';
import { MSearch } from './MessageTypes/MSearch';

/**
 * Class representing a SSDP socket.
 */
export class SsdpSocket {

	private socket: Socket;

	/**
	 * Start listen for SSDP advertisements on specified network interface address.
	 * @address The network address to start listening for SSDP advertisements on.
	 */
	startOn(address: string) {
		if (this.socket != null) {
			throw 'Socket has already been started on an address'
		}

		this.socket = createSocket({ type: 'udp4', reuseAddr: true });

		this.socket.on('listening', () => {
			const address = this.socket.address();
      		console.log(`Socket is now listening on ${address.address}:${address.port}`);

			this.search();
	    });

		this.socket.on('message', (message, remote) => {
        	console.log(`Message from ${remote.address}:${remote.port}:\r\n${message}`);
    	});

		this.socket.on('error', error => {
      		console.log('Socket error', error);
    	});

		this.socket.bind(undefined, address);
	}

	/**
	 * Starts a search for Axis cameras on the network by using HTTP method M-SEARCH.
	 */
	search() {
		const message = new MSearch().toBuffer();
		this.socket.send(message, 0, message.length, SSDP_PORT, SSDP_MULTICAST_ADDRESS);
	}
}
