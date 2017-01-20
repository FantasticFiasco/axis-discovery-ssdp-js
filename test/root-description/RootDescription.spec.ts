import { expect } from 'chai';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import * as ObjectMother from '../ObjectMother';
import { RootDescription } from './../../src/root-description/RootDescription';

chai.use(chaiAsPromised);

describe('when parsing root description', () => {
    it('should return remote address', () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        expect(subject.remoteAddress).to.equal('192.168.1.102');
    });

    it('should return friendly name', () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        return expect(subject.getFriendlyNameAsync()).to.eventually.equal('AXIS M1014 - ACCC8E270AD8');
    });

    it('should return model description', () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        return expect(subject.getModelDescriptionAsync()).to.eventually.equal('AXIS M1014 Fixed Network Camera');
    });

    it('should not return model description if missing', () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        return expect(subject.getModelDescriptionAsync()).to.eventually.be.null;
    });

    it('should return model name', () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        return expect(subject.getModelNameAsync()).to.eventually.equal('AXIS M1014');
    });

    it('should return model number', () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        return expect(subject.getModelNumberAsync()).to.eventually.equal('M1014');
      });

    it('should not return model number if missing', () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        return expect(subject.getModelNumberAsync()).to.eventually.be.null;
    });

    it('should return serial number', () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        return expect(subject.getSerialNumberAsync()).to.eventually.equal('ACCC8E270AD8');
    });

    it('should not return serial number if missing', () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        return expect(subject.getSerialNumberAsync()).to.eventually.be.null;
    });

    it('should return presentation URL', () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        return expect(subject.getPresentationUrlAsync()).to.eventually.equal('http://192.168.1.102:80/');
    });

    it('should not return presentation URL if missing', () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        return expect(subject.getPresentationUrlAsync()).to.eventually.be.null;
    });
});
