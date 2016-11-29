import { Discovery } from './Discovery';
import { Device } from './Device';

const discovery = new Discovery();

discovery.onHello((device: Device) => {
    console.log(`${new Date().toLocaleTimeString()} - Hello from ${device.serialNumber} on ${device.address}:${device.port}`);
    console.log(`JSON:\r\n${JSON.stringify(device)}`);
});

discovery.onGoodbye((device: Device) => {
    console.log(`${new Date().toLocaleTimeString()} - Goodbye from ${device.serialNumber} on ${device.address}`);
});

discovery.start();
