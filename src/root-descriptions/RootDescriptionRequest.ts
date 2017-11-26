import { IHttpRequest } from '../options/IHttpRequest';
import { log } from './../logging/Log';
import { RootDescription } from './RootDescription';

export class RootDescriptionRequest {
    constructor(
        private readonly remoteAddress: string,
        private readonly location: string,
        private readonly httpRequest: IHttpRequest) {
    }

    public async send(): Promise<RootDescription> {
        log('RootDescriptionRequest#send - %s', this.remoteAddress);

        const body = await this.httpRequest.get(this.location);
        return RootDescription.parse(this.remoteAddress, body);
    }
}
