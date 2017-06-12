import * as chai from 'chai';

import * as ObjectMother from '../ObjectMother';
import { RootDescription } from './../../src/root-description/RootDescription';

chai.should();
const should = chai.should();

describe('when parsing root description', () => {
    it('should return remote address', () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Assert
        subject.remoteAddress.should.equal('192.168.1.102');
    });

    it('should return friendly name', async () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Act
        const actual = await subject.getFriendlyNameAsync();

        // Assert
        actual.should.equal('AXIS M1014 - ACCC8E270AD8');
    });

    it('should return model description', async () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Act
        const actual = await subject.getModelDescriptionAsync();

        // Assert
        (actual as string).should.equal('AXIS M1014 Fixed Network Camera');
    });

    it('should not return model description if missing', async () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        // Act
        const actual = await subject.getModelDescriptionAsync();

        // Assert
        should.not.exist(actual);
    });

    it('should return model name', async () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Act
        const actual = await subject.getModelNameAsync();

        // Assert
        actual.should.equal('AXIS M1014');
    });

    it('should return model number', async () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Act
        const actual = await subject.getModelNumberAsync();

        // Assert
        (actual as string).should.equal('M1014');
      });

    it('should not return model number if missing', async () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        // Act
        const actual = await subject.getModelNumberAsync();

        // Assert
        should.not.exist(actual);
    });

    it('should return serial number', async () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Act
        const actual = await subject.getSerialNumberAsync();

        // Assert
        (actual as string).should.equal('ACCC8E270AD8');
    });

    it('should not return serial number if missing', async () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        // Act
        const actual = await subject.getSerialNumberAsync();

        // Assert
        should.not.exist(actual);
    });

    it('should return presentation URL', async () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Act
        const actual = await subject.getPresentationUrlAsync();

        // Assert
        (actual as string).should.equal('http://192.168.1.102:80/');
    });

    it('should not return presentation URL if missing', async () => {
        // Arrange
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        // Act
        const actual = await subject.getPresentationUrlAsync();

        // Assert
        should.not.exist(actual);
    });
});
