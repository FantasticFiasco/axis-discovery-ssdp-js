import { expect } from 'chai';

import * as objectMother from '../ObjectMother.spec';
import { SsdpMessage } from './SsdpMessage';

describe('when parsing message', () => {
    it('should return remote address information', () => {
        const subject = new SsdpMessage(
            {
                address: '192.168.1.100',
                port: 443,
                family: 'IPv4'
            },
            new Buffer('HTTP/1.1 200 OK'));

        expect(subject.remote.address).to.equal('192.168.1.100');
        expect(subject.remote.port).to.equal(443);
        expect(subject.remote.family).to.equal('IPv4');
    });

    it('should return required SSDP headers on M-SEARCH response', () => {
        const subject = new SsdpMessage(
            {
                address: '192.168.1.100',
                port: 443,
                family: 'IPv4'
            },
            new Buffer(objectMother.MSearchMessage));

        expect(subject.method).to.equal('HTTP/1.1 200 OK');
        expect(subject.location).to.equal('http://192.168.1.102:45895/rootdesc1.xml');
        expect(subject.usn).to.equal('uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1');
    });

    it('should throw error on missing SSDP headers on M-SEARCH response', () => {
        const subject = new SsdpMessage(
            {
                address: '192.168.1.100',
                port: 443,
                family: 'IPv4'
            },
            new Buffer('HTTP/1.1 200 OK\r\n'));

        expect(() => subject.location).to.throw();
        expect(() => subject.usn).to.throw();
    });

    it('should return required SSDP headers on NOTIFY', () => {
        const subject = new SsdpMessage(
            {
                address: '192.168.1.100',
                port: 443,
                family: 'IPv4'
            },
            new Buffer(objectMother.NotifyMessage));

        expect(subject.method).to.equal('NOTIFY * HTTP/1.1');
        expect(subject.location).to.equal('http://192.168.1.102:45895/rootdesc1.xml');
        expect(subject.usn).to.equal('uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1');
        expect(subject.nt).to.equal('urn:axis-com:service:BasicService:1');
        expect(subject.nts).to.equal('ssdp:byebye');
    });

    it('should throw error on missing SSDP headers on NOTIFY', () => {
        const subject = new SsdpMessage(
            {
                address: '192.168.1.100',
                port: 443,
                family: 'IPv4'
            },
            new Buffer('HTTP/1.1 200 OK\r\n'));

        expect(() => subject.location).to.throw();
        expect(() => subject.usn).to.throw();
        expect(() => subject.nt).to.throw();
        expect(() => subject.nts).to.throw();
    });

    it('should trim header value', () => {
        const subject = new SsdpMessage(
            {
                address: '192.168.1.100',
                port: 443,
                family: 'IPv4'
            },
            new Buffer(
                'HTTP/1.1 200 OK\r\n' +
                ' USN: uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1 \r\n'));

        expect(subject.usn).to.equal('uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1');
    });
});
