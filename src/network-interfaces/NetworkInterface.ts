import * as os from 'os';

/**
 * Returns all public IPv4 addresses from all network interfaces.
 */
export function getIPv4Addresses(): string[] {
    const interfaces = os.networkInterfaces();
    const addresses: string[] = [];

    Object.keys(interfaces).forEach((interfaceIndex) => {
        for (const address of interfaces[interfaceIndex] ?? []) {
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    });

    return addresses;
}
