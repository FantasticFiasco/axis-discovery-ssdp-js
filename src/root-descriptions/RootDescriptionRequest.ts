import { log } from './../logging/Log';
import { IRequestHandler } from './../options/i-request-handler';
import { RootDescription } from './RootDescription';

export class RootDescriptionRequest {
    constructor(
        private readonly remoteAddress: string,
        private readonly location: string,
        private readonly requestHandler: IRequestHandler) {
    }

    public async send(): Promise<RootDescription> {
        log('RootDescriptionRequest#send - %s', this.remoteAddress);

        const body = await this.requestHandler.get(this.location);
        return RootDescription.parse(this.remoteAddress, body);
    }
}
