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
	 * @addresses The network addresses to listen for NOTIFY advertisements on.
	 */
	constructor(private readonly addresses: string[]) {
		super();
	}

	/**
	 * Start listen for NOTIFY advertisements.
	 */
	start() {
		this.assertNotAlreadyStarted();

		this.socket = createSocket({ type: 'udp4', reuseAddr: true });
		this.socket.on('listening', () => this.onListening());
		this.socket.on('message', (message, remote) => this.onMessage(message, remote));
		this.socket.on('error', error => this.onError(error));
		this.socket.bind(Constants.SSDP_PORT);
	}

	private assertNotAlreadyStarted() {
		if (this.socket != null) {
			throw 'M-SEARCH socket has already been started'
		}
	}

	private onListening() {
		const address = this.socket.address();
		console.log(`NOTIFY socket is now listening on ${address.address}:${address.port}`);

		_.forEach(this.addresses, address => {
			this.socket.addMembership(Constants.SSDP_MULTICAST_ADDRESS, address);
		});
	}

	private onMessage(message: Buffer, remote: any) {
		const ssdpMessage = new Message(remote.address, remote.port, remote.family, message);

		if (ssdpMessage.method != 'NOTIFY * HTTP/1.1' ||
			ssdpMessage.getHeaderValue('NT') != 'urn:axis-com:service:BasicService:1') {
			return;
		}
		
		const device = ssdpMessage.mapToDevice();
		const nts = ssdpMessage.getHeaderValue('NTS');

		if (nts === 'ssdp:alive') {
			this.emit('hello', device);
		}
		else if (nts === 'ssdp:byebye') {
			this.emit('goodbye', device);
		}
	}

	private onError(error: any) {
		console.log('NOTIFY Socket error', error);
	}
}