import { Device } from './Device';
import { Discovery } from './Discovery';

const discovery = new Discovery();

discovery.onHello((device: Device) => {
    console.log(`${new Date().toLocaleTimeString()} - Hello from ${device.serialNumber} on ${device.address}:${device.port}`);
    console.log(`JSON:\n${JSON.stringify(device)}`);
});

discovery.onGoodbye((device: Device) => {
    console.log(`${new Date().toLocaleTimeString()} - Goodbye from ${device.serialNumber} on ${device.address}`);
});

discovery.start();
discovery.search();
