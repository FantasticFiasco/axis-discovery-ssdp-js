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
	 * @address The network address to listen for M-SEARCH responses on.
	 */
	constructor(private address: string) {
		super();
	}

	/**
	 * Start listen for M-SEARCH responses.
	 */
	start() {
		this.assertNotAlreadyStarted();

		this.socket = createSocket({ type: 'udp4', reuseAddr: true });
		this.socket.on('listening', () => this.onListening());
		this.socket.on('message', (message, remote) => this.onMessage(message, remote));
		this.socket.on('error', error => this.onError(error));
		this.socket.bind(undefined, this.address);
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

	private assertNotAlreadyStarted() {
		if (this.socket != null) {
			throw 'M-SEARCH socket has already been started'
		}
	}

	private onListening() {
		const address = this.socket.address();
		console.log(`M-SEARCH socket is now listening on ${address.address}:${address.port}`);

		// Trigger a search when socket is ready
		this.search();
	}

	private onMessage(message: Buffer, remote: any) {
		const device = new Message(remote.address, remote.port, remote.family, message)
			.mapToDevice();

		this.emit('hello', device);
	}

	private onError(error: any) {
		console.log('M-SEARCH socket error', error);
	}
}
