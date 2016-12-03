# axis-discovery-ssdp

[![Build Status](https://travis-ci.org/FantasticFiasco/axis-discovery-ssdp.svg?branch=master)](https://travis-ci.org/FantasticFiasco/axis-discovery-ssdp)
[![Dependency Status](https://gemnasium.com/FantasticFiasco/axis-discovery-ssdp.png)](https://gemnasium.com/FantasticFiasco/axis-discovery-ssdp)
[![NPM version](https://badge.fury.io/js/axis-discovery-ssdp.svg)](http://badge.fury.io/js/axis-discovery-ssdp)

A node.js SSDP client library written in TypeScript capable of searching for Axis Communication cameras.

## Installation

```sh
npm install axis-discovery-ssdp
```

## Usage

The following code is from the [demo application](https://github.com/FantasticFiasco/axis-discovery-ssdp/tree/master/demo-application).

```javascript
import * as ssdp from 'axis-discovery-ssdp';

const discovery = new ssdp.Discovery();

discovery.onHello((device: ssdp.Device) => {
    console.log(`Hello from ${device.address}`);
});

discovery.onGoodbye((device: ssdp.Device) => {
    console.log(`Goodbye from ${device.address}`);
});

discovery.start();
```

## API

### Discovery

The `Discovery` class is the main class in the package. With it you can register for changes to cameras on the network and respond accordingly when a camera is found on, or intentionally disconnects from, the network. 

```javascript
class Discovery {
     /**
     * Start listen for SSDP advertisements on all network interface addresses.
     */
    start(): void;

    /**
     * Triggers a new SSDP search for devices on the network.
     */
    search(): void;

    /**
     * Register a callback that is invoked when a device is found on the network.
     */
    onHello(callback: (device: Device) => void): void;

    /**
     * Register a callback that is invoked when a device intentionally is disconnecting from the
     * network.
     */
    onGoodbye(callback: (device: Device) => void): void;    
}
```

### Device

The `Device` class is a immutable description of a camera on the network.

```javascript
class Device {
    /**
     * The address.
     */
    readonly address: string;

    /**
     * The port.
     */
    readonly port: number | null;

    /**
     * The serial number.
     */
    readonly serialNumber: string | null;

    /**
     * The short description for the end user.
     */
    readonly friendlyName: string | null;

    /**
     * The model name.
     */
    readonly modelName: string | null;

    /**
     * The long model description for the end user.
     */
    readonly modelDescription: string | null;

    /**
     * The model number.
     */
    readonly modelNumber: string | null;

    /**
     * The URL to presentation for device.
     */
    readonly presentationURL: string | null;
}
```