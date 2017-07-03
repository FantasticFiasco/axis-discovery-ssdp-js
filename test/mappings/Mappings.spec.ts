import * as chai from 'chai';

import { mapFromMessage, mapFromRootDescription } from './../../src/mappings/Mappings';
import { RootDescription } from './../../src/root-descriptions/RootDescription';
import { Message } from './../../src/sockets/Message';
import * as ObjectMother from './../ObjectMother';

const should = chai.should();

describe('Mappings', function() {
    describe('#mapFromMessage', function() {
        it('should map Notify messages', function() {
            // Arrange
            const message = new Message(
                ObjectMother.REMOTE_ADDRESS,
                new Buffer(ObjectMother.NOTIFY_MESSAGE));

            // Act
            const actual = mapFromMessage(message);

            // Assert
            actual.address.should.equal('192.168.1.102');
            (actual.macAddress as string).should.equal('ACCC8E270AD8');
            should.not.exist(actual.friendlyName);
            should.not.exist(actual.modelName);
            should.not.exist(actual.modelDescription);
            should.not.exist(actual.modelNumber);
            should.not.exist(actual.presentationURL);
        });

        it('should map Notify messages and convert MAC address to uppercase', function() {
            // Arrange
            const message = new Message(
                ObjectMother.REMOTE_ADDRESS,
                new Buffer(ObjectMother.NOTIFY_MESSAGE_WITH_LOWERCASE_MACADDRESS));

            // Act
            const actual = mapFromMessage(message);

            // Assert
            (actual.macAddress as string).should.equal('ACCC8E270AD8');
        });

        it('should map M-Search messages', function() {
            // Arrange
            const message = new Message(
                ObjectMother.REMOTE_ADDRESS,
                new Buffer(ObjectMother.MSEARCH_MESSAGE));

            // Act
            const actual = mapFromMessage(message);

            // Assert
            actual.address.should.equal('192.168.1.102');
            (actual.macAddress as string).should.equal('ACCC8E270AD8');
            should.not.exist(actual.friendlyName);
            should.not.exist(actual.modelName);
            should.not.exist(actual.modelDescription);
            should.not.exist(actual.modelNumber);
            should.not.exist(actual.presentationURL);
        });

        it('should map M-Search messages and convert MAC address to uppercase', function() {
            // Arrange
            const message = new Message(
                ObjectMother.REMOTE_ADDRESS,
                new Buffer(ObjectMother.MSEARCH_MESSAGE_WITH_LOWERCASE_MACADDRESS));

            // Act
            const actual = mapFromMessage(message);

            // Assert
            (actual.macAddress as string).should.equal('ACCC8E270AD8');
        });
    });

    describe('#mapFromRootDescription', function() {
        it('should map root descriptions', async function() {
            // Arrange
            const rootDescription = await RootDescription.parse(
                ObjectMother.REMOTE_ADDRESS,
                ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Act
            const actual = mapFromRootDescription(rootDescription);

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

        it('should map root descriptions with default HTTP port', async function() {
            // Arrange
            const rootDescription = await RootDescription.parse(
                ObjectMother.REMOTE_ADDRESS,
                ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Act
            const actual = mapFromRootDescription(rootDescription);

            // Assert
            (actual.port as number).should.equal(80);
        });

        it('should map root descriptions with default HTTPS port', async function() {
            // Arrange
            const rootDescription = await RootDescription.parse(
                ObjectMother.REMOTE_ADDRESS,
                ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTPS_PORT);

            // Act
            const actual = mapFromRootDescription(rootDescription);

            // Assert
            (actual.port as number).should.equal(443);
        });

        it('should map root descriptions without port', async function() {
            // Arrange
            const rootDescription = await RootDescription.parse(
                ObjectMother.REMOTE_ADDRESS,
                ObjectMother.ROOT_DESCRIPTION_NO_PORT);

            // Act
            const actual = mapFromRootDescription(rootDescription);

            // Assert
            should.not.exist(actual.port);
        });

        it('should map root descriptions and convert MAC address to uppercase', async function() {
            // Arrange
            const rootDescription = await RootDescription.parse(
                ObjectMother.REMOTE_ADDRESS,
                ObjectMother.ROOT_DESCRIPTION_WITH_LOWERCASE_MACADDRESS);

            // Act
            const actual = mapFromRootDescription(rootDescription);

            // Assert
            (actual.macAddress as string).should.equal('ACCC8E270AD8');
        });
    });
});
