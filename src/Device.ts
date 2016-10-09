export class Device {
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
}
