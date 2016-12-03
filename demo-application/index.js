"use strict";
const ssdp = require('axis-discovery-ssdp');
const discovery = new ssdp.Discovery();
discovery.onHello((device) => {
    console.log(`Hello from ${device.address}`);
});
discovery.onGoodbye((device) => {
    console.log(`Goodbye from ${device.address}`);
});
discovery.start();
