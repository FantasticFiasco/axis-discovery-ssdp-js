import { expect } from 'chai';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import * as ObjectMother from '../ObjectMother.spec';
import { RootDescription } from './RootDescription';

chai.use(chaiAsPromised);

describe('when parsing root description', function() {
    it('should return remote address', () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        expect(subject.remoteAddress).to.equal('192.168.1.102');
    });

    it('should return friendly name', function() {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        return expect(subject.getFriendlyNameAsync()).to.eventually.equal('AXIS M1014 - ACCC8E270AD8');
    });

    it('should return model description', function() {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        return expect(subject.getModelDescriptionAsync()).to.eventually.equal('AXIS M1014 Fixed Network Camera');
    });

    it('should not return model description if missing', function() {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        return expect(subject.getModelDescriptionAsync()).to.eventually.be.null;
    });

    it('should return model name', function() {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        return expect(subject.getModelNameAsync()).to.eventually.equal('AXIS M1014');
    });

    it('should return model number', function() {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        return expect(subject.getModelNumberAsync()).to.eventually.equal('M1014');
      });

    it('should not return model number if missing', function() {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        return expect(subject.getModelNumberAsync()).to.eventually.be.null;
    });

    it('should return serial number', function() {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        return expect(subject.getSerialNumberAsync()).to.eventually.equal('ACCC8E270AD8');
    });

    it('should not return serial number if missing', function() {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        return expect(subject.getSerialNumberAsync()).to.eventually.be.null;
    });

    it('should return presentation URL', function() {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        return expect(subject.getPresentationUrlAsync()).to.eventually.equal('http://192.168.1.102:80/');
    });

    it('should not return presentation URL if missing', function() {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        return expect(subject.getPresentationUrlAsync()).to.eventually.be.null;
    });
});
