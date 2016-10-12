import * as requestPromise from 'request-promise';

import { Device } from '../Device';

export class RootDescriptionRequest {
	constructor(private readonly location: string) {
	}

	async sendAsync(): Promise<Device> {
		const rootDescription = await requestPromise.get(this.location);
		console.log(rootDescription);

		throw 'Not implemented!';
	}
}
