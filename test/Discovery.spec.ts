import * as os from 'os';
import { mocked } from 'ts-jest/utils';

import { Discovery } from './../src/Discovery';
import { NETWORK_INTERFACES_WITH_TWO_ADDRESSES } from './network-interfaces/NetworkInterface.mock';

jest.mock('os');
jest.mock('dgram');

describe('Discovery', () => {

    const osMock = mocked(os);
    let discovery: Discovery;

    beforeEach(() => {
        // Mock os
        osMock.networkInterfaces.mockReturnValue(NETWORK_INTERFACES_WITH_TWO_ADDRESSES);

        // Reset manual mocks
        jest.requireMock('dgram').mockReset();

        // Create discovery
        discovery = new Discovery();
    });

    describe('#start', () => {
        test('should not send M-SEARCH messages', async () => {
            // Act
            await discovery.start();

            // Assert
            const socketBindCallCount = jest.requireMock('dgram').socketBindCallCount;
            expect(socketBindCallCount).toBe(3);   // 1 passive and 2 active
        });
    });

    describe('#search', () => {
        test('should send M-SEARCH messages', async () => {
            // Arrange
            await discovery.start();

            // Act
            await discovery.search();

            // Assert
            // expect(socketSend.callCount).toBe(2);
            const socketSendCallCount = jest.requireMock('dgram').socketSendCallCount;
            expect(socketSendCallCount).toBe(2);
        });
    });

    describe('#stop', () => {
        test('should close sockets', async () => {
            // Arrange
            await discovery.start();

            // Act
            await discovery.stop();

            // Assert
            const socketCloseCallCount = jest.requireMock('dgram').socketCloseCallCount;
            expect(socketCloseCallCount).toBe(3);   // 1 passive and 2 active
        });
    });
});
