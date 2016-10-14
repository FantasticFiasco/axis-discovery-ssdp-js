import { expect } from 'chai';

import * as ObjectMother from './ObjectMother.spec';
import { DeviceMapper } from './DeviceMapper';
import { RootDescription } from './ssdp/RootDescription';
import { SsdpMessage } from './ssdp/SsdpMessage';

describe('when mapping to device', () => {
    it('should handle Notify messages', () => {
        const subject = new DeviceMapper();
        const message = new SsdpMessage(
            ObjectMother.REMOTE_ADDRESS,
            new Buffer(ObjectMother.NOTIFY_MESSAGE));

		const actual = subject.fromSsdpMessage(message);

        expect(actual.address).to.equal('192.168.1.102');
        expect(actual.serialNumber).to.equal('ACCC8E270AD8');
        expect(actual.friendlyName).to.be.null;
        expect(actual.modelName).to.be.null;
        expect(actual.modelDescription).to.be.null;
        expect(actual.modelNumber).to.be.null;
        expect(actual.presentationURL).to.be.null;
    });

    it('should handle M-Search messages', () => {
        const subject = new DeviceMapper();
        const message = new SsdpMessage(
            ObjectMother.REMOTE_ADDRESS,
            new Buffer(ObjectMother.MSEARCH_MESSAGE));

		const actual = subject.fromSsdpMessage(message);

        expect(actual.address).to.equal('192.168.1.102');
        expect(actual.serialNumber).to.equal('ACCC8E270AD8');
        expect(actual.friendlyName).to.be.null;
        expect(actual.modelName).to.be.null;
        expect(actual.modelDescription).to.be.null;
        expect(actual.modelNumber).to.be.null;
        expect(actual.presentationURL).to.be.null;
    });

	it('should handle root descriptions', async () => {
        const subject = new DeviceMapper();
        const rootDescription = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION);

		const actual = await subject.fromRootDescriptionAsync(rootDescription);

        expect(actual.address).to.equal('192.168.1.102');
        expect(actual.serialNumber).to.equal('ACCC8E270AD8');
        expect(actual.friendlyName).to.equal('AXIS M1014 - ACCC8E270AD8');
        expect(actual.modelName).to.equal('AXIS M1014');
        expect(actual.modelDescription).to.equal('AXIS M1014 Fixed Network Camera');
        expect(actual.modelNumber).to.equal('M1014');
        expect(actual.presentationURL).to.equal('http://192.168.1.102:80/');
    });
});
