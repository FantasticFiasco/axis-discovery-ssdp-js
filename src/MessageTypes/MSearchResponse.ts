import * as _ from 'lodash';

/**
 * Class describing the response for available services on a network. Is sent via unicast
 * addressing to the originating search request address and port number. 
 */
export class MSearchResponse {
	
	/**
	 * The address of the sender.
	 */
	remoteAddress: string;

	/**
	 * The port of the sender.
	 */
	remotePort: number;

	/**
	 * The family of the sender.
	 */
	remoteFamily: string;

	private headers: any = {};
	
	constructor(message: Buffer,
				remoteAddress: string,
				remotePort: number,
				remoteFamily: string) {
		this.remoteAddress = remoteAddress;
		this.remotePort = remotePort;
		this.remoteFamily = remoteFamily;

		this.parseMessage(message);
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

	private parseMessage(message: Buffer) {
		const headers = message
			.toString()
			.trim()
			.split('\r\n');

		const method = headers.shift();
		if (method != 'HTTP/1.1 200 OK') {
			throw 'Message is not describing a M-SEARCH response'
		}

		_.forEach(headers, header => {
			const indexOfValueSeparator = header.indexOf(':');
			const name = header.slice(0, indexOfValueSeparator).trim();
			const value = header.slice(indexOfValueSeparator + 1, header.length).trim();

			this.headers[name] = value;
		});
	}
}
