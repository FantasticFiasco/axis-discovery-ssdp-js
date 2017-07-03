import * as request from 'request';

import { RootDescription } from './RootDescription';

export class RootDescriptionRequest {
    constructor(
        private readonly remoteAddress: string,
        private readonly location: string) {
    }

    public async send(): Promise<RootDescription> {
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
