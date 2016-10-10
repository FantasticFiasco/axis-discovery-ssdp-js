export class RootDescription {
    constructor(
        /**
         * Gets the serial number.
         */
        readonly serialNumber: string,
        /**
         * Gets the short description for the end user.
         */
        readonly friendlyName: string,
        /**
         * Gets the model name.
         */
        readonly modelName: string,
        /**
         * Gets the long model description for the end user.
         */
        readonly modelDescription: string,
		/**
		 * Gets the model number.
		 */
		readonly modelNumber: string,
        /**
         * Gets the URL to presentation for device.
         */
        readonly presentationURL: string) {
    }
}
