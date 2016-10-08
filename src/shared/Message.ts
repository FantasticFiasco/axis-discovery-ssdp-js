import * as _ from 'lodash';
import { AddressInfo } from 'dgram';

import { Device } from '../Device';

/**
 * Class describing a received SSDP message.
 */
export class Message {

	private static readonly uuidRegExp = /^uuid:\s*([^:\r]*)(::.*)*/i;

	private readonly headers: any = {};

	constructor(/**
				* The sender address information.
				*/
				readonly sender: AddressInfo,
				message: Buffer) {
		this.parseHeaders(message);
	}

	/**
	 * Gets the HTTP method.
	 */
	get method(): string {
		return this.headers.method;
	}

	/**
	 * Gets the Unique Service Name (USN) header.
	 */
	get usn(): string | null {
		return this.getHeaderValue('USN');
	}

	/**
	 * Gets the Notification Type (NT) header.
	 */
	get nt(): string | null {
		return this.getHeaderValue('NT');
	}

	/**
	 * Gets the Notification Sub Type (NTS).
	 */
	get nts(): string | null {
		return this.getHeaderValue('NTS');
	}

	/**
	 * Maps the message to a device.
	 */
	mapToDevice(): Device {
		const usn = this.usn;
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
			this.sender.address,
			serialNumber);
	}

	private parseHeaders(message: Buffer) {
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

	private getHeaderValue(name: string): string | null {
		const value = this.headers[name];

		if (value == null) {
			return null;
		}

		return value;
	}
}
