import { Device } from './..';
import { Message } from './../sockets/Message';

/**
 * Maps a SSDP message to a device.
 */
export function mapFromMessage(message: Message): Device {
    const macAddressMatch = macAddressRegExp.exec(message.usn);
    if (macAddressMatch == null) {
        throw new Error('Parameter USN on SSDP message does not contain uuid.');
    }

    const macAddress = macAddressMatch[1].toUpperCase();

    return new Device(
        message.remoteAddress,
        undefined,
        macAddress,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined);
}

const macAddressRegExp = /^uuid:.*([0-9a-f]{12})::.*$/i;
