import * as _ from 'lodash';
import { AddressInfo } from 'dgram';

/**
 * Class describing a received SSDP message.
 */
export class SsdpMessage {

    private readonly headers: any = {};

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
        return this.headers.method;
    }

    /**
     * Gets the URL to the UPnP description of the root device.
     */
    get location(): string {
        return this.getRequiredHeaderValue('LOCATION');
    }

    /**
     * Gets the Unique Service Name (USN) header.
     */
    get usn(): string {
        return this.getRequiredHeaderValue('USN');
    }

    /**
     * Gets the Notification Type (NT) header.
     */
    get nt(): string {
        return this.getRequiredHeaderValue('NT');
    }

    /**
     * Gets the Notification Sub Type (NTS).
     */
    get nts(): string {
        return this.getRequiredHeaderValue('NTS');
    }

    private parseHeaders(message: Buffer) {
        const headers = message
            .toString()
            .trim()
            .split('\r\n');

        this.headers.method = headers.shift();

        _.forEach(headers, header => {
            const indexOfValueSeparator = header.indexOf(':');
            const name = header.slice(0, indexOfValueSeparator).trim();
            const value = header.slice(indexOfValueSeparator + 1, header.length).trim();

            this.headers[name] = value;
        });
    }

    private getRequiredHeaderValue(name: string): string {
        const value = this.headers[name];

        if (value == null) {
            throw `Parameter ${name} is required according to the SSDP specificarion.`;
        }

        return value;
    }
}
