import * as dgram from 'dgram';
import { expect } from 'chai';

import * as objectMother from '../ObjectMother.spec';
import { RootDescription } from './RootDescription';

describe('when parsing root description', () => {
    it('should return address', () => {
        const subject = new RootDescription(remote, objectMother.RootDescriptionXml);

		const actual = subject.remote;

		expect(actual.address).to.equal('192.168.1.102');
        expect(actual.family).to.equal('IPv4');
        expect(actual.port).to.equal(443);
    });

    it('should return friendly name', async () => {
		const subject = new RootDescription(remote, objectMother.RootDescriptionXml);

		const actual = await subject.getFriendlyNameAsync();

		expect(actual).to.equal('AXIS M1014 - ACCC8E270AD8');
    });

	it('should return model description', async () => {
		const subject = new RootDescription(remote, objectMother.RootDescriptionXml);

		const actual = await subject.getModelDescriptionAsync();

		expect(actual).to.equal('AXIS M1014 Fixed Network Camera');
    });

	it('should return model name', async () => {
		const subject = new RootDescription(remote, objectMother.RootDescriptionXml);

		const actual = await subject.getModelNameAsync();

		expect(actual).to.equal('AXIS M1014');
    });

	it('should return model number', async () => {
		const subject = new RootDescription(remote, objectMother.RootDescriptionXml);

		const actual = await subject.getModelNumberAsync();

		expect(actual).to.equal('M1014');
    });

	it('should return serial number', async () => {
		const subject = new RootDescription(remote, objectMother.RootDescriptionXml);

		const actual = await subject.getSerialNumberAsync();

		expect(actual).to.equal('ACCC8E270AD8');
    });

	it('should return presentation URL', async () => {
		const subject = new RootDescription(remote, objectMother.RootDescriptionXml);

		const actual = await subject.getPresentationUrlAsync();

		expect(actual).to.equal('http://192.168.1.102:80/');
    });
});

const remote: dgram.AddressInfo = {
        address: '192.168.1.102',
        family: 'IPv4',
        port: 443
    };


