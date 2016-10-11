import { SsdpMessage } from './ssdp/SsdpMessage';

/**
 * Class describing a device on the network.
 */
export class Device {

    private static readonly uuidRegExp = /^uuid:\s*([^:\r]*)(::.*)*/i;
    private static readonly serialNumberLength = 12;

    constructor(
        /**
         * The address.
         */
        readonly address: string,
        /**
         * The serial number.
         */
        readonly serialNumber: string,
        /**
         * Gets the short description for the end user.
         */
        readonly friendlyName: string | null = null,
        /**
         * Gets the model name.
         */
        readonly modelName: string | null = null,
        /**
         * Gets the long model description for the end user.
         */
        readonly modelDescription: string | null = null,
		/**
		 * Gets the model number.
		 */
		readonly modelNumber: string | null = null,
        /**
         * Gets the URL to presentation for device.
         */
        readonly presentationURL: string | null = null) {
    }

    /**
     * Maps from a message to a device.
     */
    static mapFromSsdpMessage(ssdpMessage: SsdpMessage): Device {
        const uuidMatch = Device.uuidRegExp.exec(ssdpMessage.usn);
        if (uuidMatch == null) {
            throw 'Parameter USN on SSDP message does not contain uuid.';
        }

        const start = uuidMatch[1].length - this.serialNumberLength;
        const end = uuidMatch[1].length;
        const serialNumber = uuidMatch[1].slice(start, end).toUpperCase();

        return new Device(
            ssdpMessage.sender.address,
            serialNumber);
    }
}
