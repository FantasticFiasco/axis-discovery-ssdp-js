import * as chai from 'chai';

import { mapFromMessage } from './../../src/sockets/Mappings';
import { Message } from './../../src/sockets/Message';
import {
    MSEARCH_MESSAGE,
    MSEARCH_MESSAGE_WITHOUT_MAC_IN_USN,
    NOTIFY_MESSAGE,
    NOTIFY_MESSAGE_WITHOUT_MAC_IN_USN
} from './Message.mock';
import {
    MSEARCH_MESSAGE_WITH_LOWERCASE_MACADDRESS,
    NOTIFY_MESSAGE_WITH_LOWERCASE_MACADDRESS
} from './../root-descriptions/Mappings.mock'


const should = chai.should();

describe('Mappings', function () {

    describe('#mapFromMessage', function () {

        it('should map Notify messages', function () {
            // Arrange
            const message = new Message(
                '192.168.1.102',
                new Buffer(NOTIFY_MESSAGE));

            // Act
            const actual = mapFromMessage(message);

            // Assert
            actual!.address.should.equal('192.168.1.102');
            actual!.macAddress!.should.equal('ACCC8E270AD8');
            should.not.exist(actual!.friendlyName);
            should.not.exist(actual!.modelName);
            should.not.exist(actual!.modelDescription);
            should.not.exist(actual!.modelNumber);
            should.not.exist(actual!.presentationURL);
        });

        it('should map Notify messages and convert MAC address to uppercase', function () {
            // Arrange
            const message = new Message(
                '192.168.1.102',
                new Buffer(NOTIFY_MESSAGE_WITH_LOWERCASE_MACADDRESS));

            // Act
            const actual = mapFromMessage(message);

            // Assert
            actual!.macAddress!.should.equal('ACCC8E270AD8');
        });

        it('should not map Notify messages without MAC in USN', function () {
            // Arrange
            const message = new Message(
                '192.168.1.102',
                new Buffer(NOTIFY_MESSAGE_WITHOUT_MAC_IN_USN));

            // Act
            const actual = mapFromMessage(message);

            // Assert
            should.not.exist(actual);
        });

        it('should map M-Search messages', function () {
            // Arrange
            const message = new Message(
                '192.168.1.102',
                new Buffer(MSEARCH_MESSAGE));

            // Act
            const actual = mapFromMessage(message);

            // Assert
            actual!.address.should.equal('192.168.1.102');
            actual!.macAddress!.should.equal('ACCC8E270AD8');
            should.not.exist(actual!.friendlyName);
            should.not.exist(actual!.modelName);
            should.not.exist(actual!.modelDescription);
            should.not.exist(actual!.modelNumber);
            should.not.exist(actual!.presentationURL);
        });

        it('should map M-Search messages and convert MAC address to uppercase', function () {
            // Arrange
            const message = new Message(
                '192.168.1.102',
                new Buffer(MSEARCH_MESSAGE_WITH_LOWERCASE_MACADDRESS));

            // Act
            const actual = mapFromMessage(message);

            // Assert
            actual!.macAddress!.should.equal('ACCC8E270AD8');
        });

        it('should not map M-Search messages without MAC in USN', function () {
            // Arrange
            const message = new Message(
                '192.168.1.102',
                new Buffer(MSEARCH_MESSAGE_WITHOUT_MAC_IN_USN));

            // Act
            const actual = mapFromMessage(message);

            // Assert
            should.not.exist(actual);
        });
    });
});
