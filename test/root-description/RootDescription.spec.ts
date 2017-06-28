import * as chai from 'chai';

import * as ObjectMother from '../ObjectMother';
import { RootDescription } from './../../src/root-description/RootDescription';

chai.should();
const should = chai.should();

describe('when parsing root description', function() {
    describe('#remoteAddress', function() {
        it('should return remote address', async function() {
            // Arrange
            const subject = await RootDescription.parse(
                ObjectMother.REMOTE_ADDRESS,
                ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Act
            const actual = subject.remoteAddress;

            // Assert
            actual.should.equal('192.168.1.102');
        });
    });

    describe('#friendlyName', function() {
        it('should return friendly name', async function() {
            // Arrange
            const subject = await RootDescription.parse(
                ObjectMother.REMOTE_ADDRESS,
                ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Act
            const actual = subject.friendlyName;

            // Assert
            actual.should.equal('AXIS M1014 - ACCC8E270AD8');
        });
    });

    describe('#modelDescription', function() {
        it('should return model description', async function() {
            // Arrange
            const subject = await RootDescription.parse(
                ObjectMother.REMOTE_ADDRESS,
                ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Act
            const actual = subject.modelDescription;

            // Assert
            (actual as string).should.equal('AXIS M1014 Fixed Network Camera');
        });

        it('should not return model description if missing', async function() {
            // Arrange
            const subject = await RootDescription.parse(
                ObjectMother.REMOTE_ADDRESS,
                ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

            // Act
            const actual = subject.modelDescription;

            // Assert
            should.not.exist(actual);
        });
    });

    describe('#modelName', function() {
        it('should return model name', async function() {
            // Arrange
            const subject = await RootDescription.parse(
                ObjectMother.REMOTE_ADDRESS,
                ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Act
            const actual = subject.modelName;

            // Assert
            actual.should.equal('AXIS M1014');
        });
    });

    describe('#modelNumber', function() {
        it('should return model number', async function() {
            // Arrange
            const subject = await RootDescription.parse(
                ObjectMother.REMOTE_ADDRESS,
                ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Act
            const actual = subject.modelNumber;

            // Assert
            (actual as string).should.equal('M1014');
        });

        it('should not return model number if missing', async function() {
            // Arrange
            const subject = await RootDescription.parse(
                ObjectMother.REMOTE_ADDRESS,
                ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

            // Act
            const actual = subject.modelNumber;

            // Assert
            should.not.exist(actual);
        });
    });

    describe('#macAddress', function() {
        it('should return MAC address', async function() {
            // Arrange
            const subject = await RootDescription.parse(
                ObjectMother.REMOTE_ADDRESS,
                ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Act
            const actual = subject.macAddress;

            // Assert
            (actual as string).should.equal('ACCC8E270AD8');
        });

        it('should not return MAC address if missing', async function() {
            // Arrange
            const subject = await RootDescription.parse(
                ObjectMother.REMOTE_ADDRESS,
                ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

            // Act
            const actual = subject.macAddress;

            // Assert
            should.not.exist(actual);
        });
    });

    describe('#presentationUrl', function() {
        it('should return presentation URL', async function() {
            // Arrange
            const subject = await RootDescription.parse(
                ObjectMother.REMOTE_ADDRESS,
                ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Act
            const actual = subject.presentationUrl;

            // Assert
            (actual as string).should.equal('http://192.168.1.102:80/');
        });

        it('should not return presentation URL if missing', async function() {
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
});
