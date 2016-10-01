import * as _ from 'lodash';
import {networkInterfaces, NetworkInterfaceInfo} from 'os';

export class NetworkInterfaces {
	
	getAddresses(): string[] {
		const interfaces = networkInterfaces();

		const addresses = _.chain(interfaces)
			.values()
			.flatten()
			.filter((entry: NetworkInterfaceInfo) => entry.family === 'IPv4')
			.filter((entry: NetworkInterfaceInfo) => !entry.internal)
			.map((entry: NetworkInterfaceInfo) => entry.address)
			.value();

		return addresses;
	}
}
