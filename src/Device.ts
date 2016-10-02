export class Device {
	
	/**
	 * The address.
	 */
	address: string;

	/**
	 * The serial number.
	 */
	serialNumber: string;
	
	constructor(address: string,
				serialNumber: string) {
		this.address = address;
		this.serialNumber = serialNumber;
	}
}
