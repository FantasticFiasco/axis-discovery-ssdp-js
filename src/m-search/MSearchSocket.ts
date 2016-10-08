import { AddressInfo } from 'dgram';

import { Constants } from '../shared/Constants';
import { Message } from '../shared/Message';
import { SsdpSocket } from '../shared/SsdpSocket';
import { MSearch } from './MSearch';

/**
 * Class representing a SSDP socket that support the HTTP method M-SEARCH.
 */
export class MSearchSocket extends SsdpSocket {

	/**
	 * @address The network address to listen for M-SEARCH responses on.
	 */
	constructor(private address: string) {
		super();
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

	protected onListening() {
		const address = this.socket.address();
		console.log(`M-SEARCH socket is now listening on ${address.address}:${address.port}`);

		// Trigger a search when socket is ready
		this.search();
	}

	protected onMessage(message: Buffer, remote: AddressInfo) {
		const device = new Message(remote, message)
			.mapToDevice();

		this.emit('hello', device);
	}

	protected bind() {
		this.socket.bind(undefined, this.address);
	}
}
