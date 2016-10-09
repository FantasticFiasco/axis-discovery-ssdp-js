import * as _ from 'lodash';
import { EventEmitter } from 'events';

import { NetworkInterfaces } from './shared/NetworkInterfaces';
import { SsdpMessage } from './shared/SsdpMessage';
import { MSearchSocket } from './m-search/MSearchSocket';
import { NotifySocket } from './notify/NotifySocket';
import { Device } from './Device';

export class SsdpDiscovery extends EventEmitter {

    private static readonly uuidRegExp = /^uuid:\s*([^:\r]*)(::.*)*/i;

    private readonly mSearchSockets = new Array<MSearchSocket>();
    private readonly networkInterfaces = new NetworkInterfaces();

    /**
     * Start listen for SSDP advertisements on all network interface addresses.
     */
    start() {
        const addresses = this.networkInterfaces.getIPv4Addresses();
        this.startNotify(addresses);
        this.startMSearch(addresses);
    }

    /**
     * Starts a search by using HTTP method M-SEARCH.
     */
    search() {
        _.forEach(this.mSearchSockets, socket => socket.search());
    }

    private startNotify(addresses: string[]) {
        const socket = new NotifySocket(addresses);

        socket.on('hello', (ssdpMessage: SsdpMessage) => {
            this.emit('hello', this.mapToDevice(ssdpMessage));
        });

        socket.on('goodbye', (ssdpMessage: SsdpMessage) => {
            this.emit('goodbye', this.mapToDevice(ssdpMessage));
        });

        socket.start();
    }

    private startMSearch(addresses: string[]) {
        _.forEach(addresses, address => {
            const socket = new MSearchSocket(address);
            this.mSearchSockets.push(socket);

            socket.on('hello', (ssdpMessage: SsdpMessage) => {
                this.emit('hello', this.mapToDevice(ssdpMessage));
            });

            socket.start();
        });
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
