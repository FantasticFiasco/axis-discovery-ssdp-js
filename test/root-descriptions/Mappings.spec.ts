import * as chai from 'chai';

import { mapFromRootDescription } from './../../src/root-descriptions/Mappings';
import { RootDescription } from './../../src/root-descriptions/RootDescription';
import {
    ROOT_DESCRIPTION_DEFAULT_HTTP_PORT,
    ROOT_DESCRIPTION_DEFAULT_HTTPS_PORT,
    ROOT_DESCRIPTION_NO_PORT,
    ROOT_DESCRIPTION_WITH_LOWERCASE_MACADDRESS,
    ROOT_DESCRIPTION_WITHOUT_MACADDRESS
} from './RootDescription.mock';

const should = chai.should();

describe('Mappings', function () {

    describe('#mapFromRootDescription', function () {

        it('should map root descriptions', async function () {
            // Arrange
            const rootDescription = await RootDescription.parse(
                '192.168.1.102',
                ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Act
            const actual = mapFromRootDescription(rootDescription);

            // Assert
            actual!.address.should.equal('192.168.1.102');
            actual!.port!.should.equal(80);
            actual!.macAddress!.should.equal('ACCC8E270AD8');
            actual!.friendlyName!.should.equal('AXIS M1014 - ACCC8E270AD8');
            actual!.modelName!.should.equal('AXIS M1014');
            actual!.modelDescription!.should.equal('AXIS M1014 Fixed Network Camera');
            actual!.modelNumber!.should.equal('M1014');
            actual!.presentationURL!.should.equal('http://192.168.1.102:80/');
        });

        it('should map root descriptions with default HTTP port', async function () {
            // Arrange
            const rootDescription = await RootDescription.parse(
                '192.168.1.102',
                ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Act
            const actual = mapFromRootDescription(rootDescription);

            // Assert
            actual!.port!.should.equal(80);
        });

        it('should map root descriptions with default HTTPS port', async function () {
            // Arrange
            const rootDescription = await RootDescription.parse(
                '192.168.1.102',
                ROOT_DESCRIPTION_DEFAULT_HTTPS_PORT);

            // Act
            const actual = mapFromRootDescription(rootDescription);

            // Assert
            actual!.port!.should.equal(443);
        });

        it('should map root descriptions without port', async function () {
            // Arrange
            const rootDescription = await RootDescription.parse(
                '192.168.1.102',
                ROOT_DESCRIPTION_NO_PORT);

            // Act
            const actual = mapFromRootDescription(rootDescription);

            // Assert
            should.not.exist(actual!.port);
        });

        it('should map root descriptions and convert MAC address to uppercase', async function () {
            // Arrange
            const rootDescription = await RootDescription.parse(
                '192.168.1.102',
                ROOT_DESCRIPTION_WITH_LOWERCASE_MACADDRESS);

            // Act
            const actual = mapFromRootDescription(rootDescription);

            // Assert
            actual!.macAddress!.should.equal('ACCC8E270AD8');
        });

        it('should not map root description without MAC address', async function () {
            // Arrange
            const rootDescription = await RootDescription.parse(
                '192.168.1.102',
                ROOT_DESCRIPTION_WITHOUT_MACADDRESS);

            // Act
            const actual = mapFromRootDescription(rootDescription);

            // Assert
            should.not.exist(actual);
        });
    });
});
