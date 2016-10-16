import * as requestPromise from 'request-promise';

import { RootDescription } from './RootDescription';

/**
 * Class responsible for requesting a root description.
 */
export class RootDescriptionRequest {
    constructor(private readonly remoteAddress: string,
                private readonly location: string) {
    }

    /**
     * Sends the request for a root description asynchronously.
     */
    async sendAsync(): Promise<RootDescription> {
        const rootDescription = await requestPromise.get(this.location);
        return new RootDescription(this.remoteAddress, rootDescription);
    }
}
