export class MessageParser {
	private location: RegExp = /^location:\s*(.*[^\s])\s*(\r)?\n/im;
	private uuid: RegExp = /^usn:\s*uuid:\s*([^:\r]*)(::.*)*\n/im;

	parseLocation(message: string) {
		const result = this.location.exec(message);
		
		if (result !== null) {
			return result[1];
		}

		return null;
	}
}