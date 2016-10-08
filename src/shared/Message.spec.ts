import { expect } from 'chai';
import { AddressInfo } from 'dgram';

import { Message } from './Message';

describe('when parsing message', () => {
	it('should return remote address information', () => {
		const subject = new Message(
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

	it('should return method', () => {
		const subject = new Message(
			{
				address: '192.168.1.100',
				port: 443,
				family: 'IPv4'
			},
			new Buffer('HTTP/1.1 200 OK'));

		expect(subject.method).to.equal('HTTP/1.1 200 OK');
	});

	it('should return USN', () => {
		const subject = new Message(
			{
				address: '192.168.1.100',
				port: 443,
				family: 'IPv4'
			},
			new Buffer(
				'HTTP/1.1 200 OK\r\n' +
				'USN: uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1\r\n'));

		const value = subject.usn;

		expect(value).to.equal('uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1');
	});

	it('should return null if USN is missing', () => {
		const subject = new Message(
			{
				address: '192.168.1.100',
				port: 443,
				family: 'IPv4'
			},
			new Buffer('HTTP/1.1 200 OK'));

		const value = subject.usn;

		expect(value).to.be.null;
	});

	it('should trim USN name and value', () => {
		const subject = new Message(
			{
				address: '192.168.1.100',
				port: 443,
				family: 'IPv4'
			},
			new Buffer(
				'HTTP/1.1 200 OK\r\n' +
				' USN: uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1 \r\n'));

		const value = subject.usn;

		expect(value).to.equal('uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1');
	});

	it('should parse device response', () => {
		const subject = new Message(
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

		const usn = subject.usn;

		expect(subject.method).to.equal('HTTP/1.1 200 OK');
		expect(usn).to.equal('uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1');
	});

	it('should map to device', () => {
		const subject = new Message(
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
				'USN: uuid:Upnp-BasicDevice-1_0-accc8e270ad8::urn:axis-com:service:BasicService:1\r\n'));

		const device = subject.mapToDevice();

		expect(device.address).to.equal('192.168.1.100');
		expect(device.serialNumber).to.equal('ACCC8E270AD8');
	});
});
