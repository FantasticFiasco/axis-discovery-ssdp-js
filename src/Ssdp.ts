import * as _ from 'lodash';
import {Socket, BindOptions, createSocket} from 'dgram';
import {EventEmitter} from 'events';
import {Device} from './Device';
import {MessageParser} from './MessageParser';

export class Ssdp extends EventEmitter {

	private sockets: Socket[] = [];
	private parser = new MessageParser();

	private searchMessage = 
		'M-SEARCH * HTTP/1.1\r\n' +
		'Host:239.255.255.250:1900\r\n' +
		'ST:urn:axis-com:service:BasicService:1\r\n' +
		'Man:"ssdp:discover"\r\n' +
		'MX:3\r\n' +
		'\r\n';

	start(address: string): void {
		const socket = createSocket({ type: 'udp4', reuseAddr: true });
		this.sockets.push(socket);

		socket.on('listening', () => {
      		console.log(`SSDP now listening on ${socket.address().address}:${socket.address().port}`);
	    });

		socket.on('message', (message, remote) => {
			var device = this.parser.parse(message);
			if (device != null)
			{
				this.emit('message', device);
			}
        	
    	});

		socket.on('error', error => {
      		console.log('SSDP socket error', error);
      		socket.close();
			_(this.sockets).pull(socket);
    	});

		socket.bind(undefined, address, undefined);
	}

	search(): void {
		_.forEach(this.sockets, (socket: Socket) => {
			const message = new Buffer(this.searchMessage);
			socket.send(message, 0, message.length, 1900, '239.255.255.250');
	    	console.log('Search message sent');
		});
	}
}
