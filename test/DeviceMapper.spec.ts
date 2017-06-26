import * as chai from 'chai';

import { DeviceMapper } from './../src/DeviceMapper';
import { RootDescription } from './../src/root-description/RootDescription';
import { Message } from './../src/sockets/Message';
import * as ObjectMother from './ObjectMother';

const should = chai.should();

describe('when mapping to device', () => {
    it('should handle Notify messages', () => {
        // Arrange
        const subject = new DeviceMapper();
        const message = new Message(
            ObjectMother.REMOTE_ADDRESS,
            new Buffer(ObjectMother.NOTIFY_MESSAGE));

        // Act
        const actual = subject.fromMessage(message);

        // Assert
        actual.address.should.equal('192.168.1.102');
        (actual.macAddress as string).should.equal('ACCC8E270AD8');
        should.not.exist(actual.friendlyName);
        should.not.exist(actual.modelName);
        should.not.exist(actual.modelDescription);
        should.not.exist(actual.modelNumber);
        should.not.exist(actual.presentationURL);
    });

    it('should handle M-Search messages', () => {
        // Arrange
        const subject = new DeviceMapper();
        const message = new Message(
            ObjectMother.REMOTE_ADDRESS,
            new Buffer(ObjectMother.MSEARCH_MESSAGE));

        // Act
        const actual = subject.fromMessage(message);

        // Assert
        actual.address.should.equal('192.168.1.102');
        (actual.macAddress as string).should.equal('ACCC8E270AD8');
        should.not.exist(actual.friendlyName);
        should.not.exist(actual.modelName);
        should.not.exist(actual.modelDescription);
        should.not.exist(actual.modelNumber);
        should.not.exist(actual.presentationURL);
    });

    it('should handle root descriptions', async () => {
        // Arrange
        const subject = new DeviceMapper();
        const rootDescription = await RootDescription.parse(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Act
        const actual = subject.fromRootDescription(rootDescription);

        // Assert
        actual.address.should.equal('192.168.1.102');
        (actual.port as number).should.equal(80);
        (actual.macAddress as string).should.equal('ACCC8E270AD8');
        (actual.friendlyName as string).should.equal('AXIS M1014 - ACCC8E270AD8');
        (actual.modelName as string).should.equal('AXIS M1014');
        (actual.modelDescription as string).should.equal('AXIS M1014 Fixed Network Camera');
        (actual.modelNumber as string).should.equal('M1014');
        (actual.presentationURL as string).should.equal('http://192.168.1.102:80/');
    });

    it('should handle root descriptions describing default HTTP port', async () => {
        // Arrange
        const subject = new DeviceMapper();
        const rootDescription = await RootDescription.parse(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Act
        const actual = subject.fromRootDescription(rootDescription);

        // Assert
        (actual.port as number).should.equal(80);
    });

    it('should handle root descriptions describing default HTTPS port', async () => {
        // Arrange
        const subject = new DeviceMapper();
        const rootDescription = await RootDescription.parse(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTPS_PORT);

        // Act
        const actual = subject.fromRootDescription(rootDescription);

        // Assert
        (actual.port as number).should.equal(443);
    });

    it('should handle root descriptions describing no port', async () => {
        // Arrange
        const subject = new DeviceMapper();
        const rootDescription = await RootDescription.parse(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_NO_PORT);

        // Act
        const actual = subject.fromRootDescription(rootDescription);

        // Assert
        should.not.exist(actual.port);
    });
});
