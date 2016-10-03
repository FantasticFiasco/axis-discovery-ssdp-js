import { SsdpDiscovery } from './SsdpDiscovery';
import { Device } from './Device';

const ssdpDiscovery = new SsdpDiscovery();

ssdpDiscovery.on('hello', (device: Device) => {
	console.log(`Hello from ${device.serialNumber} on ${device.address}`);
});

ssdpDiscovery.startOnAll();
