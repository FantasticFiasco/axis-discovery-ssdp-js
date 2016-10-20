import { Discovery } from './Discovery';
import { Device } from './Device';

const discovery = new Discovery();

discovery.on('hello', (device: Device) => {
    console.log(`${new Date().toLocaleTimeString()} - Hello from ${device.serialNumber} on ${device.address}:${device.port}. Friendly name: ${device.friendlyName}`);
});

discovery.on('goodbye', (device: Device) => {
    console.log(`${new Date().toLocaleTimeString()} - Goodbye from ${device.serialNumber} on ${device.address}`);
});

discovery.start();
