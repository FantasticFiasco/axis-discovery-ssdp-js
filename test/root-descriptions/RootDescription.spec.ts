import * as chai from 'chai';

import {
    ROOT_DESCRIPTION_DEFAULT_HTTP_PORT,
    ROOT_DESCRIPTION_REQUIRED_PROPERTIES
} from './RootDescription.mock';
import { RootDescription } from './../../src/root-descriptions/RootDescription';

chai.should();
const should = chai.should();

describe('RootDescription', function () {

    describe('#remoteAddress', function () {

        it('should return remote address', async function () {
            // Act
            const subject = await RootDescription.parse(
                '192.168.1.102',
                ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Assert
            subject.remoteAddress.should.equal('192.168.1.102');
        });
    });

    describe('#friendlyName', function () {
        it('should return friendly name', async function () {
            // Act
            const subject = await RootDescription.parse(
                '192.168.1.102',
                ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Assert
            subject.friendlyName.should.equal('AXIS M1014 - ACCC8E270AD8');
        });
    });

    describe('#modelDescription', function () {
        it('should return model description', async function () {
            // Act
            const subject = await RootDescription.parse(
                '192.168.1.102',
                ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Assert
            subject.modelDescription!.should.equal('AXIS M1014 Fixed Network Camera');
        });

        it('should not return model description if missing', async function () {
            // Act
            const subject = await RootDescription.parse(
                '192.168.1.102',
                ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

            // Assert
            should.not.exist(subject.modelDescription);
        });
    });

    describe('#modelName', function () {
        it('should return model name', async function () {
            // Act
            const subject = await RootDescription.parse(
                '192.168.1.102',
                ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Assert
            subject.modelName.should.equal('AXIS M1014');
        });
    });

    describe('#modelNumber', function () {
        it('should return model number', async function () {
            // Act
            const subject = await RootDescription.parse(
                '192.168.1.102',
                ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Assert
            subject.modelNumber!.should.equal('M1014');
        });

        it('should not return model number if missing', async function () {
            // Act
            const subject = await RootDescription.parse(
                '192.168.1.102',
                ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

            // Assert
            should.not.exist(subject.modelNumber);
        });
    });

    describe('#macAddress', function () {
        it('should return MAC address', async function () {
            // Act
            const subject = await RootDescription.parse(
                '192.168.1.102',
                ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Assert
            subject.macAddress!.should.equal('ACCC8E270AD8');
        });

        it('should not return MAC address if missing', async function () {
            // Act
            const subject = await RootDescription.parse(
                '192.168.1.102',
                ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

            // Assert
            should.not.exist(subject.macAddress);
        });
    });

    describe('#presentationUrl', function () {
        it('should return presentation URL', async function () {
            // Act
            const subject = await RootDescription.parse(
                '192.168.1.102',
                ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Assert
            subject.presentationUrl!.should.equal('http://192.168.1.102:80/');
        });

        it('should not return presentation URL if missing', async function () {
            // Act
            const subject = await RootDescription.parse(
                '192.168.1.102',
                ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

            // Assert
            should.not.exist(subject.presentationUrl);
        });
    });
});
