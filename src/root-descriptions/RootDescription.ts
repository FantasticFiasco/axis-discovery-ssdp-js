import * as xml2js from 'xml2js';

/**
 * Class describing a root description.
 */
export class RootDescription {
    private constructor(
        /**
         * The remote address.
         */
        readonly remoteAddress: string,
        private readonly rootDescription: any) {
    }

    /**
     * Parse the XML and return a root description.
     */
    public static parse(remoteAddress: string, xml: string): Promise<RootDescription> {
        return new Promise<RootDescription>((resolve, reject) => {
            xml2js.parseString(xml, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(new RootDescription(remoteAddress, result));
                }
            });
        });
    }

    /**
     * Gets the friendly name.
     */
    public get friendlyName(): string {
        return this.rootDescription['root']['device'][0]['friendlyName'][0];
    }

    /**
     * Gets the model description.
     */
    public get modelDescription(): string | undefined {
        if (!this.rootDescription['root']['device'][0]['modelDescription']) {
            return undefined;
        }

        return this.rootDescription['root']['device'][0]['modelDescription'][0];
    }

    /**
     * Gets the model name.
     */
    public get modelName(): string {
        return this.rootDescription['root']['device'][0]['modelName'][0];
    }

    /**
     * Gets the model number.
     */
    public get modelNumber(): string | undefined {
        if (!this.rootDescription['root']['device'][0]['modelNumber']) {
            return undefined;
        }

        return this.rootDescription['root']['device'][0]['modelNumber'][0];
    }

    /**
     * Gets the MAC address.
     */
    public get macAddress(): string | undefined {
        // This package is opinionated regarding the terms 'serial number' and
        // 'MAC address'. What the devices are calling 'serial numbers' are
        // actually 'MAC addresses', so lets call them for what they are...
        if (!this.rootDescription['root']['device'][0]['serialNumber']) {
            return undefined;
        }

        return (this.rootDescription['root']['device'][0]['serialNumber'][0] as string).toUpperCase();
    }

    /**
     * Gets the presentation URL.
     */
    public get presentationUrl(): string | undefined {
        if (!this.rootDescription['root']['device'][0]['presentationURL']) {
            return undefined;
        }

        return this.rootDescription['root']['device'][0]['presentationURL'][0];
    }
}
