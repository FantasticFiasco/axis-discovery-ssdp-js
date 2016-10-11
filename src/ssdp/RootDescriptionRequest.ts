import { Device } from '../Device';

export class RootDescriptionRequest {
	constructor(private readonly location: string) {
	}

	async sendAsync(): Promise<Device> {
		throw 'Not implemented!';
	}
}
