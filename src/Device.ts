import { SsdpMessage } from './sockets/SsdpMessage';

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
         * The URL to the UPnP description of the root device.
         */
        readonly location: string) {
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
            serialNumber,
            ssdpMessage.location);
    }
}
