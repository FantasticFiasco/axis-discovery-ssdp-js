import { expect } from 'chai';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { DeviceMapper } from './../src/DeviceMapper';
import { RootDescription } from './../src/root-description/RootDescription';
import { Message } from './../src/sockets/Message';
import * as ObjectMother from './ObjectMother';

chai.use(chaiAsPromised);

describe('when mapping to device', () => {
    it('should handle Notify messages', function() {
        const subject = new DeviceMapper();
        const message = new Message(
            ObjectMother.REMOTE_ADDRESS,
            new Buffer(ObjectMother.NOTIFY_MESSAGE));

        const actual = subject.fromMessage(message);

        expect(actual.address).to.equal('192.168.1.102');
        expect(actual.serialNumber).to.equal('ACCC8E270AD8');
        expect(actual.friendlyName).to.be.null;
        expect(actual.modelName).to.be.null;
        expect(actual.modelDescription).to.be.null;
        expect(actual.modelNumber).to.be.null;
        expect(actual.presentationURL).to.be.null;
    });

    it('should handle M-Search messages', function() {
        const subject = new DeviceMapper();
        const message = new Message(
            ObjectMother.REMOTE_ADDRESS,
            new Buffer(ObjectMother.MSEARCH_MESSAGE));

        const actual = subject.fromMessage(message);

        expect(actual.address).to.equal('192.168.1.102');
        expect(actual.serialNumber).to.equal('ACCC8E270AD8');
        expect(actual.friendlyName).to.be.null;
        expect(actual.modelName).to.be.null;
        expect(actual.modelDescription).to.be.null;
        expect(actual.modelNumber).to.be.null;
        expect(actual.presentationURL).to.be.null;
    });

    it('should handle root descriptions', function() {
        const subject = new DeviceMapper();
        const rootDescription = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        const actual = subject.fromRootDescriptionAsync(rootDescription);

        return Promise.all([
            expect(actual).to.eventually.have.property('address', '192.168.1.102'),
            expect(actual).to.eventually.have.property('port', 80),
            expect(actual).to.eventually.have.property('serialNumber', 'ACCC8E270AD8'),
            expect(actual).to.eventually.have.property('friendlyName', 'AXIS M1014 - ACCC8E270AD8'),
            expect(actual).to.eventually.have.property('modelName', 'AXIS M1014'),
            expect(actual).to.eventually.have.property('modelDescription', 'AXIS M1014 Fixed Network Camera'),
            expect(actual).to.eventually.have.property('modelNumber', 'M1014'),
            expect(actual).to.eventually.have.property('presentationURL', 'http://192.168.1.102:80/')]);
    });

    it('should handle root descriptions describing default HTTP port', function() {
        const subject = new DeviceMapper();
        const rootDescription = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        return expect(subject.fromRootDescriptionAsync(rootDescription))
            .to.eventually.have.property('port', 80);
    });

    it('should handle root descriptions describing default HTTPS port', function() {
        const subject = new DeviceMapper();
        const rootDescription = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTPS_PORT);

        return expect(subject.fromRootDescriptionAsync(rootDescription))
            .to.eventually.have.property('port', 443);
    });

    it('should handle root descriptions describing no port', function() {
        const subject = new DeviceMapper();
        const rootDescription = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_NO_PORT);

        return expect(subject.fromRootDescriptionAsync(rootDescription))
            .to.eventually.have.property('port', null);
    });
});
