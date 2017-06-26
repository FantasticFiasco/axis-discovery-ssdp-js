import { Device } from './Device';
import { RootDescription } from './root-description/RootDescription';
import { Message } from './sockets/Message';

export class DeviceMapper {

    private static readonly macAddressRegExp = /^uuid:.*([0-9a-f]{12})::.*$/i;
    private static readonly portFromPresentationUrlRegExp = /:(\d+)\/?$/i;

    /**
     * Maps from a SSDP message to a device.
     */
    public fromMessage(message: Message): Device {
        const macAddressMatch = DeviceMapper.macAddressRegExp.exec(message.usn);
        if (macAddressMatch == null) {
            throw new Error('Parameter USN on SSDP message does not contain uuid.');
        }

        const macAddress = macAddressMatch[1].toUpperCase()

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
