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

	private parameters = {};
	
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
	 * Returns the value of the specified parameter name.
	 */
	getParameterValue(parameterName: string): string | null {
		return this.parameters[parameterName];
	}

	private parseMessage(message: Buffer) {
		message
			.toString()
			.split('\r\n')
			.forEach(parameter => {
				const split = parameter.split(':');
				const name = split[0].trim();
				const value = split[1].trim();

				this.parameters[name] = value;
			});
	}
}
