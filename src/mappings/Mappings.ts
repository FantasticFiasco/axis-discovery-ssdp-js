import { Device } from './..';
import { RootDescription } from './../root-descriptions/RootDescription';
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

/**
 * Maps a root description to a device.
 */
export function mapFromRootDescription(rootDescription: RootDescription): Device {
    return new Device(
        rootDescription.remoteAddress,
        parsePortFromPresentationUrl(rootDescription.presentationUrl),
        rootDescription.macAddress,
        rootDescription.friendlyName,
        rootDescription.modelName,
        rootDescription.modelDescription,
        rootDescription.modelNumber,
        rootDescription.presentationUrl);
}

const macAddressRegExp = /^uuid:.*([0-9a-f]{12})::.*$/i;
const portFromPresentationUrlRegExp = /:(\d+)\/?$/i;

function parsePortFromPresentationUrl(presentationUrl: string | undefined): number | undefined {
    if (presentationUrl === undefined) {
        return undefined;
    }

    const portMatch = portFromPresentationUrlRegExp.exec(presentationUrl);
    if (portMatch == null) {
        return undefined;
    }

    return Number(portMatch[1]);
}
