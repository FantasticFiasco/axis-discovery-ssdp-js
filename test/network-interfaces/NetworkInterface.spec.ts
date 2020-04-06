import * as os from 'os';

import { getIPv4Addresses } from './../../src/network-interfaces/NetworkInterface';
import {
    NETWORK_INTERFACE_WITH_TWO_ADDRESSES,
    NETWORK_INTERFACES_WITH_INTERNAL_ADDRESSES,
    NETWORK_INTERFACES_WITH_IPV6_ADDRESSES,
    NETWORK_INTERFACES_WITH_TWO_ADDRESSES,
    NO_NETWORK_INTERFACES
} from './NetworkInterface.mock';

describe('NetworkInterface', () => {

    describe('#getIPv4Addresses', () => {

        let osStub: sinon.SinonStub;

        afterEach(() => {
            osStub.restore();
        });

        test('should return addresses from one network interface', () => {
            // Arrange
            osStub = sinon.stub(os, 'networkInterfaces')
                .returns(NETWORK_INTERFACE_WITH_TWO_ADDRESSES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            expect(addresses).toEqual(['1.1.1.1', '2.2.2.2']);
        });

        test('should return addresses from multiple network interfaces', () => {
            // Arrange
            osStub = sinon.stub(os, 'networkInterfaces')
                .returns(NETWORK_INTERFACES_WITH_TWO_ADDRESSES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            expect(addresses).toEqual(['1.1.1.1', '2.2.2.2']);
        });

        test('should not return internal addresses', () => {
            // Arrange
            osStub = sinon.stub(os, 'networkInterfaces')
                .returns(NETWORK_INTERFACES_WITH_INTERNAL_ADDRESSES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            expect(Object.keys(addresses)).toHaveLength(0);
        });

        test('should not return IPv6 addresses', () => {
            // Arrange
            osStub = sinon.stub(os, 'networkInterfaces')
                .returns(NETWORK_INTERFACES_WITH_IPV6_ADDRESSES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            expect(Object.keys(addresses)).toHaveLength(0);
        });

        test('should not fail on systems without network interfaces', () => {
            // Arrange
            osStub = sinon.stub(os, 'networkInterfaces')
                .returns(NO_NETWORK_INTERFACES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            expect(Object.keys(addresses)).toHaveLength(0);
        });
    });
});
