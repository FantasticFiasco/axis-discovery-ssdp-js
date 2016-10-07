import { EventEmitter } from 'events';
import { BindOptions, createSocket, Socket } from 'dgram';

/**
 * Abstract class acting as a SSDP socket.
 */
export abstract class SsdpSocket extends EventEmitter {

	protected socket: Socket;

	/**
	 * Start listen for advertisements.
	 */
	start() {
		this.assertNotAlreadyStarted();

		this.socket = createSocket({ type: 'udp4', reuseAddr: true });
		this.socket.on('listening', () => this.onListening());
		this.socket.on('message', (message, remote) => this.onMessage(message, remote));
		this.socket.on('error', error => this.onError(error));
		this.bind();
	}

	protected abstract onListening();

	protected abstract onMessage(message: Buffer, remote: any);

	protected abstract bind();

	protected onError(error: any) {
		console.log('NOTIFY Socket error', error);
	}

	private assertNotAlreadyStarted() {
		if (this.socket != null) {
			throw 'M-SEARCH socket has already been started'
		}
	}
}
