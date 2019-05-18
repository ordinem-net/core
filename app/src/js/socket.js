'use strict';

class Socket {
	state = {
		connect: undefined,
		action: false
	}

	constructor() {
		this.state.connect = io.connect(`http://${document.domain}:${location.port}`);

		this.state.connect.on('connect', () => {
			this.state.action = true;
			console.log('CONNECTED!');

			this.server();
			this.test_message();
		});
	}

	test_message = () => {
		const {connect, action} = this.state;

		if (action) {
			connect.emit('test', {data: 'I\'m connected!'});
		}
	}

	server = () => {
		const {connect} = this.state;

		connect.on('message', data => {
			console.log(data);
		});

		connect.on('change header', data => {
			console.log(data);
		})
	}
}