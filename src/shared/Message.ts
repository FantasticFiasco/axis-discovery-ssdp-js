import * as _ from 'lodash';

import { Device } from '../Device';

/**
 * Class describing a received SSDP message.
 */
export class Message {

	private static readonly uuidRegExp = /^uuid:\s*([^:\r]*)(::.*)*/i;

	private readonly headers: any = {};

	constructor(/**
				 * The address of the sender.
				 */
				readonly remoteAddress: string,
				/**
	 			 * The port of the sender.
	 			 */
				readonly remotePort: number,
				/**
	 			 * The family of the sender.
	 			 */
				readonly remoteFamily: string,
				message: Buffer) {
		this.parseMessage(message);
	}

	/**
	 * Gets the HTTP method.
	 */
	get method(): string {
		return this.headers.method;
	}

	/**
	 * Returns the value of the specified header name.
	 */
	getHeaderValue(headerName: string): string | null {
		const value = this.headers[headerName];
		
		if (value == null) {
			return null;
		}

		return value;
	}

	/**
	 * Maps the message to a device.
	 */
	mapToDevice(): Device {
		const usn = this.getHeaderValue('USN');
		if (usn ==  null) {
			throw 'Message does not contain parameter called USN.';
		}

		const uuidMatch = Message.uuidRegExp.exec(usn);
		if (uuidMatch == null) {
			throw 'Parameter USN does not contain uuid.';
		}

		const start = uuidMatch[1].length - 12;
		const end = uuidMatch[1].length;
		const serialNumber = uuidMatch[1].slice(start, end).toUpperCase();
		
		return new Device(
			this.remoteAddress,
			serialNumber);
	}

	private parseMessage(message: Buffer) {
		const headers = message
			.toString()
			.trim()
			.split('\r\n');

		this.headers.method = headers.shift();
		
		_.forEach(headers, header => {
			const indexOfValueSeparator = header.indexOf(':');
			const name = header.slice(0, indexOfValueSeparator).trim();
			const value = header.slice(indexOfValueSeparator + 1, header.length).trim();

			this.headers[name] = value;
		});
	}
}
