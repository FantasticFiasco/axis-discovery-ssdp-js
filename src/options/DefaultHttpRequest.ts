import * as request from 'request';

import { IHttpRequest } from './IHttpRequest';

export class DefaultHttpRequest implements IHttpRequest {
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
