import * as chai from 'chai';
import * as os from 'os';
import * as sinon from 'sinon';

import { getIPv4Addresses } from './../../src/network-interfaces/NetworkInterface';
import {
    NETWORK_INTERFACE_WITH_TWO_ADDRESSES,
    NETWORK_INTERFACES_WITH_INTERNAL_ADDRESSES,
    NETWORK_INTERFACES_WITH_IPV6_ADDRESSES,
    NETWORK_INTERFACES_WITH_TWO_ADDRESSES,
    NO_NETWORK_INTERFACES
} from './NetworkInterface.mock';

chai.should();

describe('NetworkInterface', function () {

    describe('#getIPv4Addresses', function () {

        let osStub: sinon.SinonStub;

        afterEach(function () {
            osStub.restore();
        });

        it('should return addresses from one network interface', function () {
            // Arrange
            osStub = sinon.stub(os, 'networkInterfaces')
                .returns(NETWORK_INTERFACE_WITH_TWO_ADDRESSES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            addresses.should.be.eql(['1.1.1.1', '2.2.2.2']);
        });

        it('should return addresses from multiple network interfaces', function () {
            // Arrange
            osStub = sinon.stub(os, 'networkInterfaces')
                .returns(NETWORK_INTERFACES_WITH_TWO_ADDRESSES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            addresses.should.be.eql(['1.1.1.1', '2.2.2.2']);
        });

        it('should not return internal addresses', function () {
            // Arrange
            osStub = sinon.stub(os, 'networkInterfaces')
                .returns(NETWORK_INTERFACES_WITH_INTERNAL_ADDRESSES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            addresses.should.be.empty;
        });

        it('should not return IPv6 addresses', function () {
            // Arrange
            osStub = sinon.stub(os, 'networkInterfaces')
                .returns(NETWORK_INTERFACES_WITH_IPV6_ADDRESSES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            addresses.should.be.empty;
        });

        it('should not fail on systems without network interfaces', function () {
            // Arrange
            osStub = sinon.stub(os, 'networkInterfaces')
                .returns(NO_NETWORK_INTERFACES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            addresses.should.be.empty;
        });
    });
});
