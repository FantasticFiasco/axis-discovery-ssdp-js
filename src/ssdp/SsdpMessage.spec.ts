import { expect } from 'chai';

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

        expect(subject.sender.address).to.equal('192.168.1.100');
        expect(subject.sender.port).to.equal(443);
        expect(subject.sender.family).to.equal('IPv4');
    });

    it('should return required SSDP headers on M-SEARCH response', () => {
        const subject = new SsdpMessage(
            {
                address: '192.168.1.100',
                port: 443,
                family: 'IPv4'
            },
            new Buffer(
                'HTTP/1.1 200 OK\r\n' +
                'CACHE-CONTROL: max-age=1800\r\n' +
                'DATE: Sun, 02 Oct 2016 21:11:25 GMT\r\n' +
                'EXT:\r\n' +
                'LOCATION: http://192.168.1.102:45895/rootdesc1.xml\r\n' +
                'OPT: "http://schemas.upnp.org/upnp/1/0/"; ns=01\r\n' +
                '01-NLS: 8fb2638a-1dd2-11b2-a915-c89968cce2ca\r\n' +
                'SERVER: Linux/2.6.35, UPnP/1.0, Portable SDK for UPnP devices/1.6.18\r\n' +
                'X-User-Agent: redsonic\r\n' +
                'ST: urn:axis-com:service:BasicService:1\r\n' +
                'USN: uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1\r\n'));

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
            new Buffer(
                'NOTIFY * HTTP/1.1\r\n' +
                'HOST: 239.255.255.250:1900\r\n' +
                'CACHE-CONTROL: max-age=1800\r\n' +
                'LOCATION: http://192.168.1.102:45895/rootdesc1.xml\r\n' +
                'OPT: "http://schemas.upnp.org/upnp/1/0/"; ns=01\r\n' +
                '01-NLS: 2ae7b584-1dd2-11b2-988f-983991d749b2\r\n' +
                'NT: urn:axis-com:service:BasicService:1\r\n' +
                'NTS: ssdp:byebye\r\n' +
                'SERVER: Linux/2.6.35, UPnP/1.0, Portable SDK for UPnP devices/1.6.18\r\n' +
                'X-User-Agent: redsonic\r\n' +
                'USN: uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1\r\n'));

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
