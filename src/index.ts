import { SsdpDiscovery } from './SsdpDiscovery';
import { Device } from './Device';

const discovery = new SsdpDiscovery();

discovery.on('hello', (device: Device) => {
	console.log(`${new Date()} Hello from ${device.serialNumber} on ${device.address}`);
});

discovery.on('goodbye', (device: Device) => {
	console.log(`${new Date()} Goodbye from ${device.serialNumber} on ${device.address}`);
});

discovery.start();
