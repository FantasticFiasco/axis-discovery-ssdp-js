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
         * The short description for the end user.
         */
        readonly friendlyName: string | null,
        /**
         * The model name.
         */
        readonly modelName: string | null,
        /**
         * The long model description for the end user.
         */
        readonly modelDescription: string | null,
        /**
         * The model number.
         */
        readonly modelNumber: string | null,
        /**
         * The URL to presentation for device.
         */
        readonly presentationURL: string | null) {
    }
}
