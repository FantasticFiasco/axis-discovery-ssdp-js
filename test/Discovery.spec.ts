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
    let socketStub: sinon.SinonSpy;

    beforeEach(() => {
        // Mock os
        osStub = sinon.stub(os, 'networkInterfaces')
            .returns(data.NETWORK_INTERFACES_WITH_TWO_ADDRESSES);

        let socketApi = {
            bind: () => { },
            on: () => { },
            send: () => { }
        };

        // Mock socket
        socketStub = sinon.spy(socketApi, 'send');

        // Mock dgram
        dgramStub = sinon.stub(dgram, 'createSocket')
            .returns(socketApi);
    });

    afterEach(() => {
        sinon.restore(osStub);
        sinon.restore(dgramStub);
        sinon.restore(socketStub);
    });

    it('should send M-SEARCH messages on all registered addresses', () => {
        // Arrange
        let discovery = new Discovery();
        discovery.start();

        // Act
        discovery.search();

        // Assert
        socketStub.callCount.should.equal(2);
    });
});
