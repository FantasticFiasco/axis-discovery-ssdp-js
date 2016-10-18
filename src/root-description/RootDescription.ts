import * as xml2js from 'xml2js';
import * as bluebird from 'bluebird';

const xml2jsAsync: any = bluebird.promisifyAll(xml2js);

/**
 * Class describing a root description.
 */
export class RootDescription {
    private rootDescription: any = null;

    constructor(
        /**
         * The remote address.
         */
        readonly remoteAddress: string,
        private readonly rootDescriptionXml: string) {
    }

	/**
	 * Gets the friendly name asynchronously.
	 */
    async getFriendlyNameAsync(): Promise<string> {
        return (await this.getDeviceDescriptionAsync())['friendlyName'][0];
    }

    /**
     * Gets the model description asynchronously. In the event of being missing, after all the
     * parameter is optional, null is returned.
     */
    async getModelDescriptionAsync(): Promise<string | null> {
        const deviceDescription = await this.getDeviceDescriptionAsync();
        if (!deviceDescription['modelDescription']) {
            return null;
        }

        return deviceDescription['modelDescription'][0];
    }

	/**
	 * Gets the model name asynchronously.
	 */
    async getModelNameAsync(): Promise<string> {
        return (await this.getDeviceDescriptionAsync())['modelName'][0];
    }

    /**
     * Gets the model number asynchronously. In the event of being missing, after all the
     * parameter is optional, null is returned.
     */
    async getModelNumberAsync(): Promise<string | null> {
        const deviceDescription = await this.getDeviceDescriptionAsync();
        if (!deviceDescription['modelNumber']) {
            return null;
        }

        return deviceDescription['modelNumber'][0];
    }

    /**
     * Gets the serial number asynchronously. In the event of being missing, after all the
     * parameter is optional, null is returned.
     */
    async getSerialNumberAsync(): Promise<string | null> {
        const deviceDescription = await this.getDeviceDescriptionAsync();
        if (!deviceDescription['serialNumber']) {
            return null;
        }

        return deviceDescription['serialNumber'][0];
    }

	/**
	 * Gets the presentation URL asynchronously. In the event of being missing, after all the
	 * parameter is optional, null is returned.
	 */
    async getPresentationUrlAsync(): Promise<string | null> {
        const deviceDescription = await this.getDeviceDescriptionAsync();
        if (!deviceDescription['presentationURL']) {
            return null;
        }

        return deviceDescription['presentationURL'][0];
    }

    private async getRootDescriptionAsync(): Promise<any> {
        if (this.rootDescription === null) {
            this.rootDescription = await xml2jsAsync.parseStringAsync(this.rootDescriptionXml);
        }

        return this.rootDescription;
    }

    private async getDeviceDescriptionAsync(): Promise<any> {
        return (await this.getRootDescriptionAsync())['root']['device'][0];
    }
}
