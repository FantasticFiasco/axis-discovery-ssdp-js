import * as debug from 'debug';

export function log(formatter: any, ...args: any[]) {
    if (args && args.length) {
        logger(formatter, args);
    } else {
        logger(formatter);
    }
}

const logger = debug('axis-discovery-ssdp');
