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
        readonly port: number | undefined,
        /**
         * The serial number.
         */
        readonly serialNumber: string | undefined,
        /**
         * The short description for the end user.
         */
        readonly friendlyName: string | undefined,
        /**
         * The model name.
         */
        readonly modelName: string | undefined,
        /**
         * The long model description for the end user.
         */
        readonly modelDescription: string | undefined,
        /**
         * The model number.
         */
        readonly modelNumber: string | undefined,
        /**
         * The URL to presentation for device.
         */
        readonly presentationURL: string | undefined) {
    }
}
