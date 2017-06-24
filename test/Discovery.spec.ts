import * as chai from 'chai';
import * as dgram from 'dgram';
import * as os from 'os';
import * as sinon from 'sinon';

import { Discovery } from './../src/Discovery';
import * as data from './network-interfaces/NetworkInterfaceData';

chai.should();

describe('when performing a discovery', () => {

    let osStub: sinon.SinonStub;
    let dgramStub: sinon.SinonStub;
    let socket: any;
    let discovery: Discovery;

    beforeEach(() => {
        // Mock os
        osStub = sinon.stub(os, 'networkInterfaces')
            .returns(data.NETWORK_INTERFACES_WITH_TWO_ADDRESSES);

        // Mock dgram
        socket = {
            bind: () => { },
            close: () => { },
            on: () => { },
            send: () => { },
        };

        dgramStub = sinon.stub(dgram, 'createSocket')
            .returns(socket);

        // Create discovery
        discovery = new Discovery();
    });

    afterEach(() => {
        osStub.restore();
        dgramStub.restore();
    });

    it('should not send M-SEARCH messages when started', async () => {
        // Arrange
        const socketBind = sinon.stub(socket, 'bind')
            .callsFake((_, __, callback: (() => void)) => {
                callback();
            });

        // Act
        await discovery.start();

        // Assert
        socketBind.callCount.should.equal(3);   // 1 passive and 2 active
    });

    it('should send M-SEARCH messages on all addresses when searching', async () => {
        // Arrange
        sinon.stub(socket, 'bind')
            .callsFake((_, __, callback: (() => void)) => {
                callback();
            });

        const socketSend = sinon.stub(socket, 'send')
            .callsFake((_, __, ___, ____, _____, callback: (error: Error | null) => void) => {
                callback(null);
            });

        await discovery.start();

        // Act
        await discovery.search();

        // Assert
        socketSend.callCount.should.equal(2);
    });

    it('should close all sockets when stoppedg', async () => {
        // Arrange
        sinon.stub(socket, 'bind')
            .callsFake((_, __, callback: (() => void)) => {
                callback();
            });

        const socketClose = sinon.stub(socket, 'close')
            .callsFake((callback: (() => void)) => {
                callback();
            });

        await discovery.start();

        // Act
        await discovery.stop();

        // Assert
        socketClose.callCount.should.equal(3);   // 1 passive and 2 active
    });
});
