import * as request from 'request';

import { log } from './../logging/Log';
import { RootDescription } from './RootDescription';

export class RootDescriptionRequest {
    constructor(
        private readonly remoteAddress: string,
        private readonly location: string) {
    }

    public async send(): Promise<RootDescription> {
        log('RootDescriptionRequest#send - %s', this.remoteAddress);

        return new Promise<RootDescription>((resolve, reject) => {
            request.get(this.location, undefined, (error: any, _, body: string) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(RootDescription.parse(this.remoteAddress, body));
                }
            });
        });
    }
}
