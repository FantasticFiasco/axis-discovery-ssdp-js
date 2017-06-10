import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import * as ObjectMother from '../ObjectMother';
import { RootDescription } from './../../src/root-description/RootDescription';

chai.use(chaiAsPromised);
chai.should();

describe('when parsing root description', () => {
    it('should return remote address', () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Assert
        subject.remoteAddress.should.equal('192.168.1.102');
    });

    it('should return friendly name', () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Assert
        return subject.getFriendlyNameAsync().should.eventually.equal('AXIS M1014 - ACCC8E270AD8');
    });

    it('should return model description', () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Assert
        return subject.getModelDescriptionAsync().should.eventually.equal('AXIS M1014 Fixed Network Camera');
    });

    it('should not return model description if missing', () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        // Assert
        return subject.getModelDescriptionAsync().should.eventually.be.null;
    });

    it('should return model name', () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Assert
        return subject.getModelNameAsync().should.eventually.equal('AXIS M1014');
    });

    it('should return model number', () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Assert
        return subject.getModelNumberAsync().should.eventually.equal('M1014');
      });

    it('should not return model number if missing', () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        // Assert
        return subject.getModelNumberAsync().should.eventually.be.null;
    });

    it('should return serial number', () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Assert
        return subject.getSerialNumberAsync().should.eventually.equal('ACCC8E270AD8');
    });

    it('should not return serial number if missing', () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        // Assert
        return subject.getSerialNumberAsync().should.eventually.be.null;
    });

    it('should return presentation URL', () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Assert
        return subject.getPresentationUrlAsync().should.eventually.equal('http://192.168.1.102:80/');
    });

    it('should not return presentation URL if missing', () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        // Assert
        return subject.getPresentationUrlAsync().should.eventually.be.null;
    });
});
