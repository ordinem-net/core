

class LoadImage {
	state = {
		conf: {
			action: undefined,
			blocks_load: undefined,
			path: '',
			status: false,
			default_image: ''
		},
		action: undefined,
		blocks_load: undefined,
		default_src: []
	}
	constructor (conf={action: undefined, blocks_load: undefined, path: '', status: false, default_image: ''}) {
		this.state.conf = Object.assign(this.state.conf, conf);

		this.init(conf.action, conf.blocks_load);
	}

	init(action, blocks_load) {
		this.state.action = this.#getBlock(action)[0];
		this.state.blocks_load =this.#getBlock(blocks_load);

		this.#getDefaultSrc();

		this.#createAction();
	}

	sendMessage = (type = 'update', file) => {
		let xhr = new XMLHttpRequest();
		let url = `/todo/update_user_photo/${type}`;

		xhr.open('POST', url, true);

		switch(type) {
			case 'update': {
				const {action} = this.state;
				const form = action.querySelector('#formUpdateUserImage');
				let formData = new FormData(form);

  				xhr.send(formData);
  				break;
			}
			case 'remove': {
				xhr.send();
  				break;
			}
		}

		xhr.addEventListener('readystatechange', function(e) {
			if (xhr.readyState != 4) {
				return '';
			}

    		if (xhr.status == 200) {
    			console.log('IMAGE UPDATE');
    			console.log(xhr.responseText);
    		}
    		else {
    			console.log('ERROR send');
    			console.log(xhr.status + ': ' + xhr.statusText);
    		}
  		})
	}

	#getBlock = elem => {
		return elem ? typeof elem == 'object' ? elem : 
			typeof elem == 'string' ? document.querySelectorAll(elem) : undefined : undefined;
	}

	#getDefaultSrc = () => {
		const {blocks_load} = this.state;

		for (let i = 0; i < blocks_load.length; i++) {
			this.state.default_src.push(blocks_load[i].src)
		}
	}

	#createAction = () => {
		const {status} = this.state.conf;
		const {action} = this.state;

		let block_action = document.createElement('form');
		block_action.action = '#';
		block_action.id = 'formUpdateUserImage';
		const block_action_child = `
				<input type="file" id="inpFileLoad" name="action_load_file"
					accept="image/x-png,image/gif,image/jpeg" style="display: none" />
				<label for="inpFileLoad" class="user__bth user__bth_action user__bth_margin">
					${status ? 'Изменить' : 'Добавить' }
				</label>
			`;
		block_action.innerHTML = block_action_child;
		action.appendChild(block_action);

		if (status) {
			let action_remove = document.createElement('button');
			action_remove.classList = 'user__bth user__bth_remove user__bth_margin';
			action_remove.id = 'inpFileRemove';
			action_remove.innerHTML = 'Удалить';

			action.appendChild(action_remove);
		}

		this.#createEvents(action);
	}

	#createEvents = block => {
		const inp = block.querySelector('#inpFileLoad');
		const remove = block.querySelector('#inpFileRemove');

		inp.addEventListener('change', e => {
			let file = e.target.files[0];

			let reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onloadend = function() {
    			this.#updateImage(reader.result);
    			this.sendMessage('update', e.target.files[0]);
    			//TODO: отправь на сервер

    			this.#clearAction();
    			this.state.conf.status = true;

    			this.#createAction();
  			}.bind(this);

		});

		if (remove) {
			remove.addEventListener('click', () => {
				this.#remove();
			})
		}
	}

	#updateImage = src => {
		const {blocks_load} = this.state;

		for (let i = 0; i < blocks_load.length; i++) {
			blocks_load[i].src = src;
		}
	}

	#clearAction = () => {
		const {action} = this.state;

		action.innerHTML = '';
	}

	#remove = () => {
		const {blocks_load, default_src} = this.state;

		for (let i = 0; i < blocks_load.length; i++) {
			if (blocks_load[i].src != default_src[i]) {
				blocks_load[i].src = default_src[i];
			} else {
				blocks_load[i].src = this.state.conf.default_image;
			}
		}

		this.#clearAction();
		this.state.conf.status = false;

		this.#createAction();
		this.sendMessage('remove');
	}
};