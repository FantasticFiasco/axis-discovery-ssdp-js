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
         * The MAC address. In most situations this is identical to the serial number. The
         * exceptions are the Axis products which bundle multipe physical devices into a single
         * casing with a shared network interface. Because of the shared network interface they
         * also share the same MAC address.
         */
        readonly macAddress: string | undefined,
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
