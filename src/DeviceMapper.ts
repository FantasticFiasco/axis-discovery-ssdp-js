import { Device } from './Device';
import { RootDescription } from './root-description/RootDescription';
import { Message } from './sockets/Message';

export class DeviceMapper {

    private static readonly uuidRegExp = /^uuid:\s*([^:\r]*)(::.*)*/i;
    private static readonly macAddressLength = 12;
    private static readonly portFromPresentationUrlRegExp = /:(\d+)\/?$/i;

    /**
     * Maps from a SSDP message to a device.
     */
    public fromMessage(message: Message): Device {
        const uuidMatch = DeviceMapper.uuidRegExp.exec(message.usn);
        if (uuidMatch == null) {
            throw new Error('Parameter USN on SSDP message does not contain uuid.');
        }

        const start = uuidMatch[1].length - DeviceMapper.macAddressLength;
        const end = uuidMatch[1].length;
        const macAddress = uuidMatch[1].slice(start, end).toUpperCase();

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
    public fromRootDescription(rootDescription: RootDescription): Device {
        return new Device(
            rootDescription.remoteAddress,
            this.parsePortFromPresentationUrl(rootDescription.presentationUrl),
            rootDescription.macAddress,
            rootDescription.friendlyName,
            rootDescription.modelName,
            rootDescription.modelDescription,
            rootDescription.modelNumber,
            rootDescription.presentationUrl);
    }

    private parsePortFromPresentationUrl(presentationUrl: string | undefined): number | undefined {
        if (presentationUrl === undefined) {
            return undefined;
        }

        const portMatch = DeviceMapper.portFromPresentationUrlRegExp.exec(presentationUrl);
        if (portMatch == null) {
            return undefined;
        }

        return Number(portMatch[1]);
    }
}
