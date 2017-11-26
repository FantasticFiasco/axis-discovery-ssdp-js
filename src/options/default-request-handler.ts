import * as request from 'request';

import { IRequestHandler } from './i-request-handler';

export class DefaultRequestHandler implements IRequestHandler {
    public get(url: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            request.get(url, undefined, (error: any, _, body: string) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            });
        });
    }
}
