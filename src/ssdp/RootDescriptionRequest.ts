import { RootDescription } from './RootDescription';

export class RootDescriptionRequest {
	constructor(private readonly location: string) {
	}

	async send(): Promise<RootDescription> {
		throw 'Not implemented!';
	}
}
