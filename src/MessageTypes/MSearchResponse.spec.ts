import { expect } from 'chai';
import { MSearchResponse } from './MSearchResponse';

describe('when parsing M-SEARCH response', function() {
	it ('should return remote address information', () => {
		const subject = new MSearchResponse(
			new Buffer('HTTP/1.1 200 OK'),
			'192.168.1.100',
			443,
			'IPv4');

		expect(subject.remoteAddress).to.equal('192.168.1.100');
		expect(subject.remotePort).to.equal(443);
		expect(subject.remoteFamily).to.equal('IPv4');
	})
	
	it('should be possible to get single value', function() {
		const subject = new MSearchResponse(
			new Buffer(
				'HTTP/1.1 200 OK\r\n' +
				'name: value'),
			'192.168.1.100',
			443,
			'IPv4');

		const value = subject.getHeaderValue('name');

		expect(value).to.equal('value');
	});

	it('should be possible to get multiple values', function() {
		const subject = new MSearchResponse(
			new Buffer(
				'HTTP/1.1 200 OK\r\n' +
				'name1: value1\r\n' +
				'name2: value2'),
			'192.168.1.100',
			443,
			'IPv4');

		const value1 = subject.getHeaderValue('name1');
		const value2 = subject.getHeaderValue('name2');

		expect(value1).to.equal('value1');
		expect(value2).to.equal('value2');
	});

	it('should return null for unknown parameters', () => {
		const subject = new MSearchResponse(
			new Buffer('HTTP/1.1 200 OK'),
			'192.168.1.100',
			443,
			'IPv4');

		const value = subject.getHeaderValue('unknown-name');

		expect(value).to.be.null;
	});

	it('should trim parameter name and value', () => {
		const subject = new MSearchResponse(
			new Buffer(
				'HTTP/1.1 200 OK\r\n' +
				' name : value '),
			'192.168.1.100',
			443,
			'IPv4');

		const value = subject.getHeaderValue('name');

		expect(value).to.equal('value');
	});

	it('should parse camera response', () => {
		const subject = new MSearchResponse(
			new Buffer(
				'HTTP/1.1 200 OK\r\n' +
				'CACHE-CONTROL: max-age=1800\r\n' +
				'DATE: Sun, 02 Oct 2016 21:11:25 GMT\r\n' +
				'EXT:\r\n' +
				'LOCATION: http://192.168.1.102:45895/rootdesc1.xml\r\n' +
				'OPT: "http://schemas.upnp.org/upnp/1/0/"; ns=01\r\n' +
				'01-NLS: 8fb2638a-1dd2-11b2-a915-c89968cce2ca\r\n'+
				'SERVER: Linux/2.6.35, UPnP/1.0, Portable SDK for UPnP devices/1.6.18\r\n' +
				'X-User-Agent: redsonic\r\n' +
				'ST: urn:axis-com:service:BasicService:1\r\n' +
				'USN: uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1\r\n'),
			'192.168.1.100',
			443,
			'IPv4');

		const cacheControl = subject.getHeaderValue('CACHE-CONTROL');
		const date = subject.getHeaderValue('DATE');
		const ext = subject.getHeaderValue('EXT');
		const location = subject.getHeaderValue('LOCATION');
		const opt = subject.getHeaderValue('OPT');
		const nls = subject.getHeaderValue('01-NLS');
		const server = subject.getHeaderValue('SERVER');
		const userAgent = subject.getHeaderValue('X-User-Agent');
		const st = subject.getHeaderValue('ST');
		const usn = subject.getHeaderValue('USN');

		expect(cacheControl).to.equal('max-age=1800');
		expect(date).to.equal('Sun, 02 Oct 2016 21:11:25 GMT');
		expect(ext).to.equal('');
		expect(location).to.equal('http://192.168.1.102:45895/rootdesc1.xml');
		expect(opt).to.equal('"http://schemas.upnp.org/upnp/1/0/"; ns=01');
		expect(nls).to.equal('8fb2638a-1dd2-11b2-a915-c89968cce2ca');
		expect(server).to.equal('Linux/2.6.35, UPnP/1.0, Portable SDK for UPnP devices/1.6.18');
		expect(userAgent).to.equal('redsonic');
		expect(st).to.equal('urn:axis-com:service:BasicService:1');
		expect(usn).to.equal('uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1');
	})
});
