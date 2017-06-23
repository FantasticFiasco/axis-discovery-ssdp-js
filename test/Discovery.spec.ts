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
    let socketSpy: any;
    let discovery: Discovery;

    beforeEach(() => {
        // Mock os
        osStub = sinon.stub(os, 'networkInterfaces')
            .returns(data.NETWORK_INTERFACES_WITH_TWO_ADDRESSES);

        // Mock dgram
        socketSpy = {
            bind: () => sinon.spy(),
            close: () => sinon.spy(),
            on: () => sinon.spy(),
            send: () => sinon.spy(),
        };

        dgramStub = sinon.stub(dgram, 'createSocket')
            .returns(socketSpy);

        discovery = new Discovery();
    });

    afterEach(() => {
        osStub.restore();
        dgramStub.restore();
    });

    it('should send M-SEARCH messages on all registered addresses', async () => {
        // Arrange
        await discovery.start();

        // Act
        await discovery.search();

        // Assert
        socketSpy.send.callCount.should.equal(2);
    });

    it('should close all sockets when stopping', async () => {
        // Arrange
        await discovery.start();

        // Act
        await discovery.stop();

        // Assert
        socketSpy.close.callCount.should.equal(2);
    });
});
