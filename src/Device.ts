/**
 * Class describing a device on the network.
 */
export class Device {
    constructor(
        /**
         * The address.
         */
        readonly address: string,
        /**
         * The port.
         */
        readonly port: number | null,
        /**
         * The serial number.
         */
        readonly serialNumber: string | null,
        /**
         * Gets the short description for the end user.
         */
        readonly friendlyName: string | null,
        /**
         * Gets the model name.
         */
        readonly modelName: string | null,
        /**
         * Gets the long model description for the end user.
         */
        readonly modelDescription: string | null,
		/**
		 * Gets the model number.
		 */
        readonly modelNumber: string | null,
        /**
         * Gets the URL to presentation for device.
         */
        readonly presentationURL: string | null) {
    }
}
