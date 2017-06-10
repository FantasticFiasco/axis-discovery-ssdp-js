import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { DeviceMapper } from './../src/DeviceMapper';
import { RootDescription } from './../src/root-description/RootDescription';
import { Message } from './../src/sockets/Message';
import * as ObjectMother from './ObjectMother';

chai.use(chaiAsPromised);
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
        (actual.serialNumber as string).should.equal('ACCC8E270AD8');
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
        (actual.serialNumber as string).should.equal('ACCC8E270AD8');
        should.not.exist(actual.friendlyName);
        should.not.exist(actual.modelName);
        should.not.exist(actual.modelDescription);
        should.not.exist(actual.modelNumber);
        should.not.exist(actual.presentationURL);
    });

    it('should handle root descriptions', () => {
        // Arrange
        const subject = new DeviceMapper();
        const rootDescription = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Act
        const actual = subject.fromRootDescriptionAsync(rootDescription);

        // Assert
        return Promise.all([
            actual.should.eventually.have.property('address', '192.168.1.102'),
            actual.should.eventually.have.property('port', 80),
            actual.should.eventually.have.property('serialNumber', 'ACCC8E270AD8'),
            actual.should.eventually.have.property('friendlyName', 'AXIS M1014 - ACCC8E270AD8'),
            actual.should.eventually.have.property('modelName', 'AXIS M1014'),
            actual.should.eventually.have.property('modelDescription', 'AXIS M1014 Fixed Network Camera'),
            actual.should.eventually.have.property('modelNumber', 'M1014'),
            actual.should.eventually.have.property('presentationURL', 'http://192.168.1.102:80/')]);
    });

    it('should handle root descriptions describing default HTTP port', () => {
        // Arrange
        const subject = new DeviceMapper();
        const rootDescription = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        // Assert
        return subject.fromRootDescriptionAsync(rootDescription).should.eventually
            .have.property('port', 80);
    });

    it('should handle root descriptions describing default HTTPS port', () => {
        // Arrange
        const subject = new DeviceMapper();
        const rootDescription = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTPS_PORT);

        // Assert
        return subject.fromRootDescriptionAsync(rootDescription).should.eventually
            .have.property('port', 443);
    });

    it('should handle root descriptions describing no port', () => {
        // Arrange
        const subject = new DeviceMapper();
        const rootDescription = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_NO_PORT);

        // Assert
        return subject.fromRootDescriptionAsync(rootDescription).should.eventually
            .have.property('port', null);
    });
});
