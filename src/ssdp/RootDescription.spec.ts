import { expect } from 'chai';

import * as objectMother from '../ObjectMother.spec';
import { RootDescription } from './RootDescription';

describe('when parsing root description', () => {
    it('should return remote address', () => {
        const subject = new RootDescription(
            objectMother.remoteAddress,
            objectMother.RootDescriptionXml);

    const actual = subject.remoteAddress;

    expect(actual).to.equal('192.168.1.102');
    });

    it('should return friendly name', async () => {
        const subject = new RootDescription(
            objectMother.remoteAddress,
            objectMother.RootDescriptionXml);

        const actual = await subject.getFriendlyNameAsync();

        expect(actual).to.equal('AXIS M1014 - ACCC8E270AD8');
    });

	it('should return model description', async () => {
        const subject = new RootDescription(
            objectMother.remoteAddress,
            objectMother.RootDescriptionXml);

        const actual = await subject.getModelDescriptionAsync();

        expect(actual).to.equal('AXIS M1014 Fixed Network Camera');
    });

    it('should return model name', async () => {
        const subject = new RootDescription(
            objectMother.remoteAddress,
            objectMother.RootDescriptionXml);

        const actual = await subject.getModelNameAsync();

        expect(actual).to.equal('AXIS M1014');
    });

    it('should return model number', async () => {
        const subject = new RootDescription(
            objectMother.remoteAddress,
            objectMother.RootDescriptionXml);

        const actual = await subject.getModelNumberAsync();

        expect(actual).to.equal('M1014');
      });

    it('should return serial number', async () => {
        const subject = new RootDescription(
            objectMother.remoteAddress,
            objectMother.RootDescriptionXml);

        const actual = await subject.getSerialNumberAsync();

        expect(actual).to.equal('ACCC8E270AD8');
    });

    it('should return presentation URL', async () => {
        const subject = new RootDescription(
            objectMother.remoteAddress,
            objectMother.RootDescriptionXml);

        const actual = await subject.getPresentationUrlAsync();

        expect(actual).to.equal('http://192.168.1.102:80/');
    });
});
