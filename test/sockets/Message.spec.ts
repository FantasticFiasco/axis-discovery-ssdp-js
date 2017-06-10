import * as chai from 'chai';

import * as ObjectMother from '../ObjectMother';
import { Message } from './../../src/sockets/Message';

chai.should();

describe('when parsing message', () => {
    it('should return remote address', () => {
        // Arrange
        const subject = new Message('192.168.1.100', new Buffer('HTTP/1.1 200 OK'));

        // Assert
        subject.remoteAddress.should.equal('192.168.1.100');
    });

    it('should return required SSDP headers on M-SEARCH response', () => {
        // Arrange
        const subject = new Message('192.168.1.100', new Buffer(ObjectMother.MSEARCH_MESSAGE));

        // Assert
        subject.method.should.equal('HTTP/1.1 200 OK');
        subject.location.should.equal('http://192.168.1.102:45895/rootdesc1.xml');
        subject.usn.should.equal('uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1');
    });

    it('should throw error on missing SSDP headers on M-SEARCH response', () => {
        // Arrange
        const subject = new Message('192.168.1.100', new Buffer('HTTP/1.1 200 OK\r\n'));

        // Assert
        (() => subject.location).should.throw();
        (() => subject.usn).should.throw();
    });

    it('should return required SSDP headers on NOTIFY', () => {
        // Arrange
        const subject = new Message('192.168.1.100', new Buffer(ObjectMother.NOTIFY_MESSAGE));

        // Assert
        subject.method.should.equal('NOTIFY * HTTP/1.1');
        subject.location.should.equal('http://192.168.1.102:45895/rootdesc1.xml');
        subject.usn.should.equal('uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1');
        subject.nt.should.equal('urn:axis-com:service:BasicService:1');
        subject.nts.should.equal('ssdp:byebye');
    });

    it('should throw error on missing SSDP headers on NOTIFY', () => {
        // Arrange
        const subject = new Message('192.168.1.100', new Buffer('HTTP/1.1 200 OK\r\n'));

        // Assert
        (() => subject.location).should.throw();
        (() => subject.usn).should.throw();
        (() => subject.nt).should.throw();
        (() => subject.nts).should.throw();
    });

    it('should trim header value', () => {
        // Arrange
        const subject = new Message(
            '192.168.1.100',
            new Buffer(
                'HTTP/1.1 200 OK\r\n' +
                ' USN: uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1 \r\n'));

        // Assert
        subject.usn.should.equal('uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1');
    });
});
