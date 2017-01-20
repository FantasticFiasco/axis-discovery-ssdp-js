import { expect } from 'chai';
import * as os from 'os';
import * as sinon from 'sinon';

import { NetworkInterfaceMonitor } from './../../src/network-interfaces/NetworkInterfaceMonitor';
import * as data from './NetworkInterfaceData';

describe('when monitoring IPv4 addresses on network interfaces', () => {

    let osStub: sinon.SinonStub;
    let networkInterfaceMonitor = new NetworkInterfaceMonitor();

    afterEach(() => {
        sinon.restore(osStub);
    });

    it('should return addresses from one network interface', () => {
        // Arrange
        osStub = sinon.stub(os, 'networkInterfaces')
            .returns(data.NETWORK_INTERFACE_WITH_TWO_ADDRESSES);

        // Act
        let addresses = networkInterfaceMonitor.getIPv4Addresses();

        // Assert
        expect(addresses).to.be.eql(['1.1.1.1', '2.2.2.2']);
    });

    it('should return addresses from multiple network interfaces', () => {
        // Arrange
        osStub = sinon.stub(os, 'networkInterfaces')
            .returns(data.NETWORK_INTERFACES_WITH_TWO_ADDRESSES);

        // Act
        let addresses = networkInterfaceMonitor.getIPv4Addresses();

        // Assert
        expect(addresses).to.be.eql(['1.1.1.1', '2.2.2.2']);
    });

    it('should return an empty sequence if only internal addresses exists', () => {
        // Arrange
        osStub = sinon.stub(os, 'networkInterfaces')
            .returns(data.NETWORK_INTERFACES_WITH_INTERNAL_ADDRESSES);

        // Act
        let addresses = networkInterfaceMonitor.getIPv4Addresses();

        // Assert
        expect(addresses).to.be.empty;
    });

    it('should return an empty sequence if only IPv6 addresses exists', () => {
        // Arrange
        osStub = sinon.stub(os, 'networkInterfaces')
            .returns(data.NETWORK_INTERFACES_WITH_IPV6_ADDRESSES);

        // Act
        let addresses = networkInterfaceMonitor.getIPv4Addresses();

        // Assert
        expect(addresses).to.be.empty;
    });

    it('should return an empty sequence if no interfaces exists', () => {
        // Arrange
        osStub = sinon.stub(os, 'networkInterfaces')
            .returns(data.NO_NETWORK_INTERFACES);

        // Act
        let addresses = networkInterfaceMonitor.getIPv4Addresses();

        // Assert
        expect(addresses).to.be.empty;
    });
});
