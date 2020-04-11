import * as dgram from 'dgram';
import * as os from 'os';
import { mocked } from 'ts-jest/utils';

import { Discovery } from './../src/Discovery';
import { NETWORK_INTERFACES_WITH_TWO_ADDRESSES } from './network-interfaces/NetworkInterface.mock';

jest.mock('os');

describe('Discovery', () => {

    const osMock = mocked(os);
    let dgramStub: sinon.SinonStub;
    let socket: any;
    let discovery: Discovery;

    beforeEach(() => {
        // Mock os
        osMock.networkInterfaces.mockReturnValue(NETWORK_INTERFACES_WITH_TWO_ADDRESSES);

        // Mock dgram
        socket = {
            bind: function () { },
            close: function () { },
            on: function () { },
            send: function () { },
        };

        dgramStub = sinon.stub(dgram, 'createSocket')
            .returns(socket);

        // Create discovery
        discovery = new Discovery();
    });

    describe('#start', () => {
        test('should not send M-SEARCH messages', async () => {
            // Arrange
            const socketBind = sinon.stub(socket, 'bind')
                .callsArg(2);   // callback is the third argument

            // Act
            await discovery.start();

            // Assert
            expect(socketBind.callCount).toBe(3);   // 1 passive and 2 active
        });
    });

    describe('#search', () => {
        test('should send M-SEARCH messages', async () => {
            // Arrange
            sinon.stub(socket, 'bind')
                .callsArg(2);   // callback is the third argument

            const socketSend = sinon.stub(socket, 'send')
                .callsArg(5);   // callback is the sixth argument

            await discovery.start();

            // Act
            await discovery.search();

            // Assert
            expect(socketSend.callCount).toBe(2);
        });
    });

    describe('#stop', () => {
        test('should close sockets', async () => {
            // Arrange
            sinon.stub(socket, 'bind')
                .callsArg(2);   // callback is the third argument

            const socketClose = sinon.stub(socket, 'close')
                .callsArg(0);   // callback is the first argument

            await discovery.start();

            // Act
            await discovery.stop();

            // Assert
            expect(socketClose.callCount).toBe(3);   // 1 passive and 2 active
        });
    });
});
