import * as ssdp from 'axis-discovery-ssdp';

const discovery = new ssdp.Discovery();

discovery.onHello((device: ssdp.Device) => {
    console.log(`Hello from ${device.address}`);
});

discovery.onGoodbye((device: ssdp.Device) => {
    console.log(`Goodbye from ${device.address}`);
});

discovery.start();
