import * as _ from 'lodash';
import { EventEmitter } from 'events';

import { MSearchSocket } from './sockets/MSearchSocket';
import { NetworkInterfaces } from './network-interfaces/NetworkInterfaces';
import { NotifySocket } from './sockets/NotifySocket';
import { SsdpMessage } from './sockets/SsdpMessage';
import { SsdpSocket } from './sockets/SsdpSocket';
import { Device } from './Device';

export class SsdpDiscovery extends EventEmitter {

    private static readonly uuidRegExp = /^uuid:\s*([^:\r]*)(::.*)*/i;

    private readonly sockets = new Array<SsdpSocket>();
    private readonly networkInterfaces = new NetworkInterfaces();

    /**
     * Start listen for SSDP advertisements on all network interface addresses.
     */
    start() {
        const addresses = this.networkInterfaces.getIPv4Addresses();

        // Start passive SSDP
        this.startSocket(new NotifySocket(addresses));

        // Start active SSDP
        _.forEach(addresses, address => this.startSocket(new MSearchSocket(address)));
    }

    /**
     * Starts a search by using HTTP method M-SEARCH.
     */
    search() {
        _.chain(this.sockets)
            .filter(socket => socket instanceof MSearchSocket)
            .map(socket => <MSearchSocket>socket)
            .forEach(socket => socket.search());
    }

    private startSocket(socket: SsdpSocket) {
        this.sockets.push(socket);

        socket.on('hello', (ssdpMessage: SsdpMessage) => {
            this.emit('hello', this.mapToDevice(ssdpMessage));
        });

        socket.on('goodbye', (ssdpMessage: SsdpMessage) => {
            this.emit('goodbye', this.mapToDevice(ssdpMessage));
        });

        socket.start();
    }

    private mapToDevice(ssdpMessage: SsdpMessage): Device {
        const uuidMatch = SsdpDiscovery.uuidRegExp.exec(ssdpMessage.usn);
        if (uuidMatch == null) {
            throw 'Parameter USN on SSDP message does not contain uuid.';
        }

        const start = uuidMatch[1].length - 12;
        const end = uuidMatch[1].length;
        const serialNumber = uuidMatch[1].slice(start, end).toUpperCase();

        return new Device(
            ssdpMessage.sender.address,
            serialNumber,
            ssdpMessage.location);
    }
}
