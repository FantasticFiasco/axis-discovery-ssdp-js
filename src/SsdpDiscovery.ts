import * as _ from 'lodash';
import { EventEmitter } from 'events';

import { NetworkInterfaces } from './NetworkInterfaces';
import { SsdpSocket } from './SsdpSocket';

export class SsdpDiscovery extends EventEmitter {

	private sockets = new Array<SsdpSocket>();
	private networkInterfaces = new NetworkInterfaces();

	/**
	 * Start listen for SSDP advertisements on specified network interface address.
	 * @address The network address to start listening for SSDP advertisements on.
	 */
	startOn(address: string) {
		const socket = new SsdpSocket();
		socket.startOn(address);

		this.sockets.push(socket);
	}

	/**
	 * Start listen for SSDP advertisements on all network interface addresses.
	 */
	startOnAll() {
		_.forEach(this.networkInterfaces.getIPv4Addresses(), address => this.startOn(address));
	}

	/**
	 * Starts a search for Axis cameras on the network by using HTTP method M-SEARCH.
	 */
	search() {
		_.forEach(this.sockets, socket => socket.search());
	}
}
