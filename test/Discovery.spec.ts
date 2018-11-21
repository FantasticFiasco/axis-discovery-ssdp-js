import * as chai from 'chai';
import * as dgram from 'dgram';
import * as os from 'os';
import * as sinon from 'sinon';

import { Discovery } from './../src/Discovery';
import { NETWORK_INTERFACES_WITH_TWO_ADDRESSES } from './network-interfaces/NetworkInterface.mock';

chai.should();

describe('Discovery', function () {

    let osStub: sinon.SinonStub;
    let dgramStub: sinon.SinonStub;
    let socket: any;
    let discovery: Discovery;

    beforeEach(function () {
        // Mock os
        osStub = sinon.stub(os, 'networkInterfaces')
            .returns(NETWORK_INTERFACES_WITH_TWO_ADDRESSES);

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

    afterEach(function () {
        osStub.restore();
        dgramStub.restore();
    });

    describe('#start', function () {
        it('should not send M-SEARCH messages', async function () {
            // Arrange
            const socketBind = sinon.stub(socket, 'bind')
                .callsArg(2);   // callback is the third argument

            // Act
            await discovery.start();

            // Assert
            socketBind.callCount.should.equal(3);   // 1 passive and 2 active
        });
    });

    describe('#search', function () {
        it('should send M-SEARCH messages', async function () {
            // Arrange
            sinon.stub(socket, 'bind')
                .callsArg(2);   // callback is the third argument

            const socketSend = sinon.stub(socket, 'send')
                .callsArg(5);   // callback is the sixth argument

            await discovery.start();

            // Act
            await discovery.search();

            // Assert
            socketSend.callCount.should.equal(2);
        });
    });

    describe('#stop', function () {
        it('should close sockets', async function () {
            // Arrange
            sinon.stub(socket, 'bind')
                .callsArg(2);   // callback is the third argument

            const socketClose = sinon.stub(socket, 'close')
                .callsArg(0);   // callback is the first argument

            await discovery.start();

            // Act
            await discovery.stop();

            // Assert
            socketClose.callCount.should.equal(3);   // 1 passive and 2 active
        });
    });
});
