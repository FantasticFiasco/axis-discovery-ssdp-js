import { expect } from 'chai';
import * as os from 'os';
import * as sinon from 'sinon';

import { NetworkInterfaceMonitor } from './../../src/network-interfaces/NetworkInterfaceMonitor';

describe('when monitoring IPv4 addresses on network interfaces', () => {

    let osStub: sinon.SinonStub;
    let networkInterfaceMonitor = new NetworkInterfaceMonitor();

    afterEach(() => {
        sinon.restore(osStub);
    });

    it('should return addresses from one network interface', () => {
        // Arrange
        osStub = sinon.stub(os, 'networkInterfaces').returns({
            Ethernet: [
                { address: '1.1.1.1', netmask: '255.0.0.0', family: 'IPv4', mac: '11:11:11:11:11:11', internal: false },
                { address: '2.2.2.2', netmask: '255.0.0.0', family: 'IPv4', mac: '11:11:11:11:11:11', internal: false }
            ]
        });

        // Act
        let addresses = networkInterfaceMonitor.getIPv4Addresses();

        // Assert
        expect(addresses).to.be.eql(['1.1.1.1', '2.2.2.2']);
    });

    it('should return addresses from multiple network interfaces', () => {
        // Arrange
        osStub = sinon.stub(os, 'networkInterfaces').returns({
            Ethernet1: [
                { address: '1.1.1.1', netmask: '255.0.0.0', family: 'IPv4', mac: '11:11:11:11:11:11', internal: false },
            ],
            Ethernet2: [
                { address: '2.2.2.2', netmask: '255.0.0.0', family: 'IPv4', mac: '11:11:11:11:11:11', internal: false }
            ]
        });

        // Act
        let addresses = networkInterfaceMonitor.getIPv4Addresses();

        // Assert
        expect(addresses).to.be.eql(['1.1.1.1', '2.2.2.2']);
    });

    it('should return an empty sequence if only internal addresses exists', () => {
        // Arrange
        osStub = sinon.stub(os, 'networkInterfaces').returns({
            Ethernet1: [
                { address: '1.1.1.1', netmask: '255.0.0.0', family: 'IPv4', mac: '11:11:11:11:11:11', internal: true },
            ],
            Ethernet2: [
                { address: '2.2.2.2', netmask: '255.0.0.0', family: 'IPv4', mac: '11:11:11:11:11:11', internal: true }
            ]
        });

        // Act
        let addresses = networkInterfaceMonitor.getIPv4Addresses();

        // Assert
        expect(addresses).to.be.empty;
    });

    it('should return an empty sequence if no interfaces exists', () => {
        // Arrange
        osStub = sinon.stub(os, 'networkInterfaces')
            .returns({});

        // Act
        let addresses = networkInterfaceMonitor.getIPv4Addresses();

        // Assert
        expect(addresses).to.be.empty;
    });

    it('should return an empty sequence if only IPv6 addresses exists', () => {
        // Arrange
        osStub = sinon.stub(os, 'networkInterfaces').returns({
            Ethernet1: [
                { address: '1111::1111:1111:1111:1111', netmask: 'ffff:ffff:ffff:ffff::', family: 'IPv6', mac: '11:11:11:11:11:11', scopeid: 6, internal: false }
            ],
            Ethernet2: [
                { address: '2222::2222:2222:2222:2222', netmask: 'ffff:ffff:ffff:ffff::', family: 'IPv6', mac: '22:22:22:22:22:22', scopeid: 6, internal: false }
            ]
        });

        // Act
        let addresses = networkInterfaceMonitor.getIPv4Addresses();

        // Assert
        expect(addresses).to.be.empty;
    });
});
