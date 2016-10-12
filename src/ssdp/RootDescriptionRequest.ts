import * as requestPromise from 'request-promise';

import { Device } from '../Device';

export class RootDescriptionRequest {
	constructor(private readonly location: string) {
	}

	async sendAsync(): Promise<Device | null> {
		try {
			const rootDescription = await requestPromise.get(this.location);
			console.log(rootDescription);
		}
		catch (e) {
			console.log(`Unable to get root description. ${e}`);
			return null;
		}

		throw 'Not implemented!';
	}
}
