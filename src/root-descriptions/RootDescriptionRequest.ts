import { log } from './../logging';
import { RootDescription } from './RootDescription';

export class RootDescriptionRequest {
    constructor(
        private readonly remoteAddress: string,
        private readonly location: string,
        private readonly getRequest: (url: string) => Promise<string>) {
    }

    public async send(): Promise<RootDescription> {
        log('RootDescriptionRequest#send - %s', this.remoteAddress);

        const body = await this.getRequest(this.location);
        return RootDescription.parse(this.remoteAddress, body);
    }
}
