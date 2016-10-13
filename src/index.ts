import { SsdpDiscovery } from './SsdpDiscovery';
import { Device } from './Device';

const discovery = new SsdpDiscovery();

discovery.on('hello', (device: Device) => {
    console.log(`${new Date().toLocaleTimeString()} - Hello from ${device.serialNumber} on ${device.address}. Friendly name: ${device.friendlyName}`);
});

discovery.on('goodbye', (device: Device) => {
    console.log(`${new Date().toLocaleTimeString()} - Goodbye from ${device.serialNumber} on ${device.address}`);
});

discovery.start();
