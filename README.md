# axis-discovery-ssdp

[![Build Status](https://travis-ci.org/FantasticFiasco/axis-discovery-ssdp.svg?branch=master)](https://travis-ci.org/FantasticFiasco/axis-discovery-ssdp)
[![Coverage Status](https://coveralls.io/repos/github/FantasticFiasco/axis-discovery-ssdp/badge.svg)](https://coveralls.io/github/FantasticFiasco/axis-discovery-ssdp)
[![npm version](https://img.shields.io/npm/v/axis-discovery-ssdp.svg)](https://www.npmjs.com/package/axis-discovery-ssdp)
[![Greenkeeper badge](https://badges.greenkeeper.io/FantasticFiasco/axis-discovery-ssdp.svg)](https://greenkeeper.io/)
[![dependencies Status](https://david-dm.org/FantasticFiasco/axis-discovery-ssdp/status.svg)](https://david-dm.org/FantasticFiasco/axis-discovery-ssdp)
[![devDependencies Status](https://david-dm.org/FantasticFiasco/axis-discovery-ssdp/dev-status.svg)](https://david-dm.org/FantasticFiasco/axis-discovery-ssdp?type=dev)

A Node.js SSDP (UPnP) client library written in TypeScript capable of searching for [Axis Communication](http://www.axis.com) cameras.

## Table of contents

- [Super simple to use](#super-simple-to-use)
- [Installation](#installation)
- [API](#api)
- [Credit](#credit)

---

## Super simple to use

```javascript
import * as ssdp from 'axis-discovery-ssdp';

const discovery = new ssdp.Discovery();

discovery.onHello((device: ssdp.Device) => {
    console.log(`Hello from ${device.address}`);
});

discovery.onGoodbye((device: ssdp.Device) => {
    console.log(`Goodbye from ${device.address}`);
});

await discovery.start();
await discovery.search();
```

## Installation

```sh
npm install axis-discovery-ssdp
```

## API

### `Discovery`

The `Discovery` class is the main class in the package. With it you can register for changes to cameras on the network and respond accordingly when a camera is found on, or intentionally disconnects from, the network.

```javascript
class Discovery {
    /**
     * Start listen for device advertisements on all network interface
     * addresses.
     */
    start(): Promise<void>;

    /**
     * Stop listening for device advertisements.
     */
    stop(): Promise<void>;

    /**
     * Triggers a new search for devices on the network.
     */
    search(): Promise<void>;

    /**
     * Register a callback that is invoked when a device is found on the
     * network.
     */
    onHello(callback: (device: Device) => void): void;

    /**
     * Register a callback that is invoked when a device intentionally is
     * disconnecting from the network.
     */
    onGoodbye(callback: (device: Device) => void): void;
}
```

### `Device`

The `Device` class is a immutable description of a camera on the network.

```javascript
class Device {
    /**
     * Gets the address.
     */
    readonly address: string;

    /**
     * Gets the port.
     */
    readonly port: number | undefined;

    /**
     * Gets the MAC address. In most situations this is identical to the
     * serial number. The exceptions are the Axis products which bundle
     * multiple physical devices into a single casing with a shared network
     * interface. Because of the shared network interface they also share
     * the same MAC address.
     */
    readonly macAddress: string | undefined;

    /**
     * Gets the short description for the end user.
     */
    readonly friendlyName: string | undefined;

    /**
     * Gets the model name.
     */
    readonly modelName: string | undefined;

    /**
     * Gets the long model description for the end user.
     */
    readonly modelDescription: string | undefined;

    /**
     * Gets the model number.
     */
    readonly modelNumber: string | undefined;

    /**
     * Gets the URL to the web page of the device.
     */
    readonly presentationURL: string | undefined;
}
```

## Credit

Thank you [JetBrains](https://www.jetbrains.com/) for your important initiative to support the open source community with free licenses to your products.

![JetBrains](./design/jetbrains.png)
