import * as bluebird from 'bluebird';
import * as xml2js from 'xml2js';

const xml2jsAsync: any = bluebird.promisifyAll(xml2js);

/**
 * Class describing a root description.
 */
export class RootDescription {
    private rootDescription: any = undefined;

    constructor(
        /**
         * The remote address.
         */
        readonly remoteAddress: string,
        private readonly rootDescriptionXml: string) {
    }

    /**
     * Gets the friendly name.
     */
    public async getFriendlyName(): Promise<string> {
        const deviceDescription = await this.getDeviceDescription();
        return deviceDescription['friendlyName'][0];
    }

    /**
     * Gets the model description.
     */
    public async getModelDescription(): Promise<string | undefined> {
        const deviceDescription = await this.getDeviceDescription();
        if (!deviceDescription['modelDescription']) {
            return undefined;
        }

        return deviceDescription['modelDescription'][0];
    }

    /**
     * Gets the model name.
     */
    public async getModelName(): Promise<string> {
        const deviceDescription = await this.getDeviceDescription();
        return deviceDescription['modelName'][0];
    }

    /**
     * Gets the model number.
     */
    public async getModelNumber(): Promise<string | undefined> {
        const deviceDescription = await this.getDeviceDescription();
        if (!deviceDescription['modelNumber']) {
            return undefined;
        }

        return deviceDescription['modelNumber'][0];
    }

    /**
     * Gets the serial number.
     */
    public async getSerialNumber(): Promise<string | undefined> {
        const deviceDescription = await this.getDeviceDescription();
        if (!deviceDescription['serialNumber']) {
            return undefined;
        }

        return deviceDescription['serialNumber'][0];
    }

    /**
     * Gets the presentation URL.
     */
    public async getPresentationUrl(): Promise<string | undefined> {
        const deviceDescription = await this.getDeviceDescription();
        if (!deviceDescription['presentationURL']) {
            return undefined;
        }

        return deviceDescription['presentationURL'][0];
    }

    private async getDeviceDescription(): Promise<any> {
        const rootDescription = await this.getRootDescription();
        return rootDescription['root']['device'][0];
    }

    private async getRootDescription(): Promise<any> {
        if (this.rootDescription === undefined) {
            this.rootDescription = await xml2jsAsync.parseStringAsync(this.rootDescriptionXml);
        }

        return this.rootDescription;
    }
}
