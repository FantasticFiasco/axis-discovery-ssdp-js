import { Device, Discovery } from './';

const discovery = new Discovery();

discovery.onHello((device: Device) => {
    console.log(`${new Date().toLocaleTimeString()} - Hello from ${device.serialNumber} on ${device.address}`);
    console.log(`\tport: ${device.port}`);
    console.log(`\tmodel: ${device.modelName}`);
});

discovery.onGoodbye((device: Device) => {
    console.log(`${new Date().toLocaleTimeString()} - Goodbye from ${device.serialNumber} on ${device.address}`);
});

discovery.start()
    .then(() => discovery.search());
