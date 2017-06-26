import * as chai from 'chai';

import * as ObjectMother from '../ObjectMother';
import { RootDescription } from './../../src/root-description/RootDescription';

chai.should();
const should = chai.should();

describe('when parsing root description', () => {
    it('should return remote address', async () => {
        // Arrange
        const subject = await RootDescription.parse(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Assert
        subject.remoteAddress.should.equal('192.168.1.102');
    });

    it('should return friendly name', async () => {
        // Arrange
        const subject = await RootDescription.parse(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Act
        const actual = subject.friendlyName;

        // Assert
        actual.should.equal('AXIS M1014 - ACCC8E270AD8');
    });

    it('should return model description', async () => {
        // Arrange
        const subject = await RootDescription.parse(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Act
        const actual = subject.modelDescription;

        // Assert
        (actual as string).should.equal('AXIS M1014 Fixed Network Camera');
    });

    it('should not return model description if missing', async () => {
        // Arrange
        const subject = await RootDescription.parse(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        // Act
        const actual = subject.modelDescription;

        // Assert
        should.not.exist(actual);
    });

    it('should return model name', async () => {
        // Arrange
        const subject = await RootDescription.parse(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Act
        const actual = subject.modelName;

        // Assert
        actual.should.equal('AXIS M1014');
    });

    it('should return model number', async () => {
        // Arrange
        const subject = await RootDescription.parse(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Act
        const actual = subject.modelNumber;

        // Assert
        (actual as string).should.equal('M1014');
      });

    it('should not return model number if missing', async () => {
        // Arrange
        const subject = await RootDescription.parse(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        // Act
        const actual = subject.modelNumber;

        // Assert
        should.not.exist(actual);
    });

    it('should return MAC address', async () => {
        // Arrange
        const subject = await RootDescription.parse(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Act
        const actual = subject.macAddress;

        // Assert
        (actual as string).should.equal('ACCC8E270AD8');
    });

    it('should not return MAC address if missing', async () => {
        // Arrange
        const subject = await RootDescription.parse(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        // Act
        const actual = subject.macAddress;

        // Assert
        should.not.exist(actual);
    });

    it('should return presentation URL', async () => {
        // Arrange
        const subject = await RootDescription.parse(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Act
        const actual = subject.presentationUrl;

        // Assert
        (actual as string).should.equal('http://192.168.1.102:80/');
    });

    it('should not return presentation URL if missing', async () => {
        // Arrange
        const subject = await RootDescription.parse(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        // Act
        const actual = subject.presentationUrl;

        // Assert
        should.not.exist(actual);
    });
});
