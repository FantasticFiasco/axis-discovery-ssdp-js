import * as chai from 'chai';

import {
    MSEARCH_MESSAGE,
    NOTIFY_MESSAGE
} from './Message.mock';
import { Message } from './../../src/sockets/Message';

chai.should();

describe('Message', function () {

    it('#remoteAddress', function () {
        // Arrange
        const subject = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK'));

        // Assert
        subject.remoteAddress.should.equal('192.168.1.100');
    });

    it('should trim header values', function () {
        // Arrange
        const subject = new Message(
            '192.168.1.100',
            Buffer.from(
                'HTTP/1.1 200 OK\r\n' +
                ' USN: uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1 \r\n'));

        // Assert
        subject.usn.should.equal('uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1');
    });

    describe('M-SEARCH response', () => {
        it('#method', function () {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from(MSEARCH_MESSAGE));

            // Assert
            subject.method.should.equal('HTTP/1.1 200 OK');
        });

        it('#location', function () {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from(MSEARCH_MESSAGE));

            // Assert
            subject.location.should.equal('http://192.168.1.102:45895/rootdesc1.xml');
        });

        it('#usn', function () {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from(MSEARCH_MESSAGE));

            // Assert
            subject.usn.should.equal('uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1');
        });

        it('#location should fail if missing', function () {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK\r\n'));

            // Assert
            (() => subject.location).should.throw();
        });

        it('#usn should fail if missing', function () {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK\r\n'));

            // Assert
            (() => subject.usn).should.throw();
        });
    });

    describe('NOTIFY', () => {
        it('#method', function () {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from(NOTIFY_MESSAGE));

            // Assert
            subject.method.should.equal('NOTIFY * HTTP/1.1');
        });

        it('#location', function () {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from(NOTIFY_MESSAGE));

            // Assert
            subject.location.should.equal('http://192.168.1.102:45895/rootdesc1.xml');
        });

        it('#location should fail if missing', function () {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK\r\n'));

            // Assert
            (() => subject.location).should.throw();
        });

        it('#usn', function () {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from(NOTIFY_MESSAGE));

            // Assert
            subject.usn.should.equal('uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1');
        });

        it('#usn should fail if missing', function () {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK\r\n'));

            // Assert
            (() => subject.usn).should.throw();
        });

        it('#nt', function () {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from(NOTIFY_MESSAGE));

            // Assert
            subject.nt.should.equal('urn:axis-com:service:BasicService:1');
        });

        it('#nt should fail if missing', function () {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK\r\n'));

            // Assert
            (() => subject.nt).should.throw();
        });

        it('#nts', function () {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from(NOTIFY_MESSAGE));

            // Assert
            subject.nts.should.equal('ssdp:byebye');
        });

        it('#nts should fail if missing', function () {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK\r\n'));

            // Assert
            (() => subject.nts).should.throw();
        });
    });
});
