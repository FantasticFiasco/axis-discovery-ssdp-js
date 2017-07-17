export const NETWORK_INTERFACE_WITH_TWO_ADDRESSES = {
    Ethernet: [
        { address: '1.1.1.1', netmask: '255.0.0.0', family: 'IPv4', mac: '11:11:11:11:11:11', internal: false },
        { address: '2.2.2.2', netmask: '255.0.0.0', family: 'IPv4', mac: '11:11:11:11:11:11', internal: false },
    ],
};

export const NETWORK_INTERFACES_WITH_TWO_ADDRESSES = {
    Ethernet1: [
        { address: '1.1.1.1', netmask: '255.0.0.0', family: 'IPv4', mac: '11:11:11:11:11:11', internal: false },
    ],
    Ethernet2: [
        { address: '2.2.2.2', netmask: '255.0.0.0', family: 'IPv4', mac: '11:11:11:11:11:11', internal: false },
    ],
};

export const NETWORK_INTERFACES_WITH_INTERNAL_ADDRESSES = {
    Ethernet1: [
        { address: '1.1.1.1', netmask: '255.0.0.0', family: 'IPv4', mac: '11:11:11:11:11:11', internal: true },
    ],
    Ethernet2: [
        { address: '2.2.2.2', netmask: '255.0.0.0', family: 'IPv4', mac: '11:11:11:11:11:11', internal: true },
    ],
};

export const NETWORK_INTERFACES_WITH_IPV6_ADDRESSES = {
    Ethernet1: [
        { address: '1111::1111:1111:1111:1111', netmask: 'ffff:ffff:ffff:ffff::', family: 'IPv6', mac: '11:11:11:11:11:11', scopeid: 6, internal: false },
    ],
    Ethernet2: [
        { address: '2222::2222:2222:2222:2222', netmask: 'ffff:ffff:ffff:ffff::', family: 'IPv6', mac: '22:22:22:22:22:22', scopeid: 6, internal: false },
    ],
};

export const NO_NETWORK_INTERFACES = {
};
