import { Device } from './Device';
import { RootDescription } from './ssdp/RootDescription';
import { SsdpMessage } from './ssdp/SsdpMessage';

export class DeviceMapper {

	private static readonly uuidRegExp = /^uuid:\s*([^:\r]*)(::.*)*/i;
    private static readonly serialNumberLength = 12;

	/**
     * Maps from a SSDP message to a device.
     */
    fromSsdpMessage(ssdpMessage: SsdpMessage): Device {
        const uuidMatch = DeviceMapper.uuidRegExp.exec(ssdpMessage.usn);
        if (uuidMatch == null) {
            throw 'Parameter USN on SSDP message does not contain uuid.';
        }

        const start = uuidMatch[1].length - DeviceMapper.serialNumberLength;
        const end = uuidMatch[1].length;
        const serialNumber = uuidMatch[1].slice(start, end).toUpperCase();

        return new Device(
            ssdpMessage.remoteAddress,
            serialNumber);
    }

    /**
     * Maps a root description to a device.
     */
    async fromRootDescriptionAsync(rootDescription: RootDescription): Promise<Device> {
        const serialNumber = await rootDescription.getSerialNumberAsync();
        const friendlyName = await rootDescription.getFriendlyNameAsync();
        const modelName = await rootDescription.getModelNameAsync();
        const modelDescription = await rootDescription.getModelDescriptionAsync();
        const modelNumber = await rootDescription.getModelNumberAsync();
        const presentationUrl = await rootDescription.getPresentationUrlAsync();

        return new Device(
            rootDescription.remoteAddress,
            serialNumber,
            friendlyName,
            modelName,
            modelDescription,
            modelNumber,
            presentationUrl);
    }
}