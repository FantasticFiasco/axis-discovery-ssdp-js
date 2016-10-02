import { Device } from './device';

export class MessageParser {
	private locationRegExp = /^location:\s*(.*[^\s])\s*(\r)?\n/im;
	private uuidRegExp = /^usn:\s*uuid:\s*([^:\r]*)(::.*)*(\r)?\n/im;

	parse(message: string): Device | null {
		const uuidMatch = this.uuidRegExp.exec(message);
		const locationMatch = this.locationRegExp.exec(message);

		if (uuidMatch !== null && locationMatch !== null) {
			const serialNumber = this.parseSerialNumberFromUuid(uuidMatch[1]);

			return new Device(serialNumber, locationMatch[1]);
		}

		return null;
	}

	private parseSerialNumberFromUuid(uuid: string): string {
		// uuid example: 'Upnp-BasicDevice-1_0-ACCC8E270AD8'
		const serialNumberLength = 12;
		const start = uuid.length - serialNumberLength;
		
		return uuid.substr(start, serialNumberLength);
	}
}