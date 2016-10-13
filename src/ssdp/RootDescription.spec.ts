import * as dgram from 'dgram';
import { expect } from 'chai';

import { RootDescription } from './RootDescription';

describe('when parsing root description', () => {
    it('should return address', () => {
        const subject = new RootDescription(address, rootDescriptionXml);

		const actual = subject.remote;

		expect(actual.address).to.equal('192.168.1.102');
        expect(actual.family).to.equal('IPv4');
        expect(actual.port).to.equal(443);
    });

    it('should return friendly name', async () => {
		const subject = new RootDescription(address, rootDescriptionXml);

		const actual = await subject.getFriendlyNameAsync();

		expect(actual).to.equal('AXIS M1014 - ACCC8E270AD8');
    });

	it('should return model description', async () => {
		const subject = new RootDescription(address, rootDescriptionXml);

		const actual = await subject.getModelDescriptionAsync();

		expect(actual).to.equal('AXIS M1014 Fixed Network Camera');
    });

	it('should return model name', async () => {
		const subject = new RootDescription(address, rootDescriptionXml);

		const actual = await subject.getModelNameAsync();

		expect(actual).to.equal('AXIS M1014');
    });

	it('should return model number', async () => {
		const subject = new RootDescription(address, rootDescriptionXml);

		const actual = await subject.getModelNumberAsync();

		expect(actual).to.equal('M1014');
    });

	it('should return serial number', async () => {
		const subject = new RootDescription(address, rootDescriptionXml);

		const actual = await subject.getSerialNumberAsync();

		expect(actual).to.equal('ACCC8E270AD8');
    });

	it('should return presentation URL', async () => {
		const subject = new RootDescription(address, rootDescriptionXml);

		const actual = await subject.getPresentationUrlAsync();

		expect(actual).to.equal('http://192.168.1.102:80/');
    });
});

const address: dgram.AddressInfo = {
        address: '192.168.1.102',
        family: 'IPv4',
        port: 443
    };

const rootDescriptionXml =
    '<?xml version="1.0"?>' +
    '<root xmlns="urn:schemas-upnp-org:device-1-0">' +
    '    <specVersion>' +
    '        <major>1</major>' +
    '        <minor>0</minor>' +
    '    </specVersion>' +
    '    <device>' +
    '        <deviceType>urn:schemas-upnp-org:device:Basic:1</deviceType>' +
    '        <friendlyName>AXIS M1014 - ACCC8E270AD8</friendlyName>' +
    '        <manufacturer>AXIS</manufacturer>' +
    '        <manufacturerURL>http://www.axis.com/</manufacturerURL>' +
    '        <modelDescription>AXIS M1014 Fixed Network Camera</modelDescription>' +
    '        <modelName>AXIS M1014</modelName>' +
    '        <modelNumber>M1014</modelNumber>' +
    '        <modelURL>http://www.axis.com/</modelURL>' +
    '        <serialNumber>ACCC8E270AD8</serialNumber>' +
    '        <UDN>uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8</UDN>' +
    '        <serviceList>' +
    '            <service>' +
    '                <serviceType>urn:axis-com:service:BasicService:1</serviceType>' +
    '                <serviceId>urn:axis-com:serviceId:BasicServiceId</serviceId>' +
    '                <controlURL>/upnp/control/BasicServiceId</controlURL>' +
    '                <eventSubURL>/upnp/event/BasicServiceId</eventSubURL>' +
    '                <SCPDURL>/scpd_basic.xml</SCPDURL>' +
    '            </service>' +
    '        </serviceList>' +
    '        <presentationURL>http://192.168.1.102:80/</presentationURL>' +
    '    </device>' +
    '    <URLBase>http://192.168.1.102:51578/</URLBase>' +
    '</root>';
