import * as _ from 'lodash';
import { EventEmitter } from 'events';

import { NetworkInterfaces } from './shared/NetworkInterfaces';
import { MSearchSocket } from './m-search/MSearchSocket';
import { NotifySocket } from './notify/NotifySocket';

export class SsdpDiscovery extends EventEmitter {

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

		socket.on('hello', device => {
			this.emit('hello', device);
		});

		socket.on('goodbye', device => {
			this.emit('goodbye', device);
		});

		socket.start();
	}

	private startMSearch(addresses: string[]) {
		_.forEach(addresses, address => {
			const socket = new MSearchSocket(address);
			this.mSearchSockets.push(socket);
		
			socket.on('hello', device => {
				this.emit('hello', device);
			});
		
			socket.start();
		});
	}
}
