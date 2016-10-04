import * as _ from 'lodash';
import { EventEmitter } from 'events';

import { NetworkInterfaces } from './network/NetworkInterfaces';
import { ActiveSsdpSocket } from './network/ActiveSsdpSocket';

export class SsdpDiscovery extends EventEmitter {

	private sockets = new Array<ActiveSsdpSocket>();
	private networkInterfaces = new NetworkInterfaces();

	/**
	 * Start listen for SSDP advertisements on all network interface addresses.
	 */
	start() {
		_.forEach(
			this.networkInterfaces.getIPv4Addresses(),
			address => this.startOn(address));
	}

	/**
	 * Starts a search by using HTTP method M-SEARCH.
	 */
	search() {
		_.forEach(this.sockets, socket => socket.search());
	}

	private startOn(address: string) {
		const socket = new ActiveSsdpSocket();
		
		socket.on('hello', device => {
			this.emit('hello', device);
		});
		
		socket.startOn(address);
		
		this.sockets.push(socket);
	}
}
