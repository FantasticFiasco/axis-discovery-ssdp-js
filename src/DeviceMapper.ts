import { Device } from './Device';
import { RootDescription } from './root-description/RootDescription';
import { Message } from './sockets/Message';

export class DeviceMapper {

    private static readonly uuidRegExp = /^uuid:\s*([^:\r]*)(::.*)*/i;
    private static readonly serialNumberLength = 12;
    private static readonly portFromPresentationUrlRegExp = /:(\d+)\/?$/i;

    /**
     * Maps from a SSDP message to a device.
     */
    public fromMessage(message: Message): Device {
        const uuidMatch = DeviceMapper.uuidRegExp.exec(message.usn);
        if (uuidMatch == null) {
            throw new Error('Parameter USN on SSDP message does not contain uuid.');
        }

        const start = uuidMatch[1].length - DeviceMapper.serialNumberLength;
        const end = uuidMatch[1].length;
        const serialNumber = uuidMatch[1].slice(start, end).toUpperCase();

        return new Device(
            message.remoteAddress,
            null,
            serialNumber,
            null,
            null,
            null,
            null,
            null);
    }

    /**
     * Maps a root description to a device.
     */
    public async fromRootDescriptionAsync(rootDescription: RootDescription): Promise<Device> {
        const serialNumber = await rootDescription.getSerialNumberAsync();
        const friendlyName = await rootDescription.getFriendlyNameAsync();
        const modelName = await rootDescription.getModelNameAsync();
        const modelDescription = await rootDescription.getModelDescriptionAsync();
        const modelNumber = await rootDescription.getModelNumberAsync();
        const presentationUrl = await rootDescription.getPresentationUrlAsync();

        const port = this.parsePortFromPresentationUrl(presentationUrl);

        return new Device(
            rootDescription.remoteAddress,
            port,
            serialNumber,
            friendlyName,
            modelName,
            modelDescription,
            modelNumber,
            presentationUrl);
    }

    private parsePortFromPresentationUrl(presentationUrl: string | null): number | null {
        if (presentationUrl === null) {
            return null;
        }

        const portMatch = DeviceMapper.portFromPresentationUrlRegExp.exec(presentationUrl);
        if (portMatch == null) {
            return null;
        }

        return Number(portMatch[1]);
    }
}
