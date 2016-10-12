import * as xml2js from 'xml2js';
import * as bluebird from 'bluebird';

const xml2jsAsync: any = bluebird.promisifyAll(xml2js);

/**
 * Class describing a root description.
 */
export class RootDescription {
	private rootDescription: any = null;

	constructor(private readonly rootDescriptionXml: string) {
	}

	/**
	 * Gets the friendly name asynchronously.
	 */
	async getFriendlyNameAsync(): Promise<string> {
		return (await this.getRootDescriptionAsync())['root']['device'][0]['friendlyName'][0];
	}

	/**
	 * Gets the model description asynchronously.
	 */
	async getModelDescriptionAsync(): Promise<string> {
		return (await this.getRootDescriptionAsync())['root']['device'][0]['modelDescription'][0];
	}

	/**
	 * Gets the model name asynchronously.
	 */
	async getModelNameAsync(): Promise<string> {
		return (await this.getRootDescriptionAsync())['root']['device'][0]['modelName'][0];
	}

	/**
	 * Gets the model number asynchronously.
	 */
	async getModelNumberAsync(): Promise<string> {
		return (await this.getRootDescriptionAsync())['root']['device'][0]['modelNumber'][0];
	}

	/**
	 * Gets the serial number asynchronously.
	 */
	async getSerialNumberAsync(): Promise<string> {
		return (await this.getRootDescriptionAsync())['root']['device'][0]['serialNumber'][0];
	}

	/**
	 * Gets the presentation URL asynchronously.
	 */
	async getPresentationUrlAsync(): Promise<string> {
		return (await this.getRootDescriptionAsync())['root']['device'][0]['presentationURL'][0];
	}

	private async getRootDescriptionAsync(): Promise<any> {
		if (this.rootDescription === null) {
			this.rootDescription = await xml2jsAsync.parseStringAsync(this.rootDescriptionXml);
		}

		return this.rootDescription;
	}
}
