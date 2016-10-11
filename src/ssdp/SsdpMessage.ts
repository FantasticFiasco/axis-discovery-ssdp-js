import * as _ from 'lodash';
import { AddressInfo } from 'dgram';

/**
 * Class describing a received SSDP message.
 */
export class SsdpMessage {

    private readonly headers: { [name: string]: string } = {};

    constructor(/**
                 * The sender address information.
                 */
                readonly sender: AddressInfo,
                message: Buffer) {
        this.parseHeaders(message);
    }

    /**
     * Gets the HTTP method.
     */
    get method(): string {
        return this.headers['method'];
    }

    /**
     * Gets the URL to the UPnP description of the root device.
     */
    get location(): string {
        return this.headers['LOCATION'];
    }

    /**
     * Gets the Unique Service Name (USN) header.
     */
    get usn(): string {
        return this.headers['USN'];
    }

    /**
     * Gets the Notification Type (NT) header.
     */
    get nt(): string {
        return this.headers['NT'];
    }

    /**
     * Gets the Notification Sub Type (NTS).
     */
    get nts(): string {
        return this.headers['NTS'];
    }

    private parseHeaders(message: Buffer) {
        const headers = message
            .toString()
            .trim()
            .split('\r\n');

        const method = headers.shift();
        if (method === undefined) {
            throw 'SSDP message is not specifying the method.';
        }

        this.headers['method'] = method;

        _.forEach(headers, header => {
            const indexOfValueSeparator = header.indexOf(':');
            const name = header.slice(0, indexOfValueSeparator).trim();
            const value = header.slice(indexOfValueSeparator + 1, header.length).trim();

            this.headers[name] = value;
        });
    }
}
