import {expect} from 'chai';
import {MSearchResponse} from './MSearchResponse';

describe('when parsing M-SEARCH response', function() {
	it ('should return remote address information', () => {
		const subject = new MSearchResponse(new Buffer(''), '192.168.1.100', 443, 'IPv4');

		expect(subject.remoteAddress).to.equal('192.168.1.100');
		expect(subject.remotePort).to.equal(443);
		expect(subject.remoteFamily).to.equal('IPv4');
	})
	
	it('should be possible to get single value', function() {
		const message = new Buffer('name: value');
		const subject = new MSearchResponse(message, '192.168.1.100', 443, 'IPv4');

		const value = subject.getParameterValue('name');

		expect(value).to.equal('value');
	});

	it('should be possible to get multiple values', function() {
		const message = new Buffer(
			'name1: value1\r\n' +
			'name2: value2');
		const subject = new MSearchResponse(message, '192.168.1.100', 443, 'IPv4');

		const value1 = subject.getParameterValue('name1');
		const value2 = subject.getParameterValue('name2');

		expect(value1).to.equal('value1');
		expect(value2).to.equal('value2');
	});

	it('should return null for unknown parameters', () => {
		const subject = new MSearchResponse(new Buffer(''), '192.168.1.100', 443, 'IPv4');

		const value = subject.getParameterValue('unknown-name');

		expect(value).to.be.null;
	});

	it('should trim parameter name and value', () => {
		const message = new Buffer(' name : value ');
		const subject = new MSearchResponse(message, '192.168.1.100', 443, 'IPv4');

		const value = subject.getParameterValue('name');

		expect(value).to.equal('value');
	});
});
