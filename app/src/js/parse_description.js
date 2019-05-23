class ParseDescription {
	state = {
		obj: undefined,
		el: undefined
	}
	constructor({el, obj}) {
		if (typeof obj == 'string') {
			this.state.obj = fixJsObj(obj);
		} else {
			this.state.obj = obj;
		}

		this.init_elem(el);
	}

	init_elem = elem => {
		this.state.el = elem ? typeof elem == 'object' ? elem : 
			typeof elem == 'string' ? document.querySelector(elem) : undefined : undefined;

		if (this.state.el) {
			this.#start();
		}
	}

	#start = () => {
		const {obj, el} = this.state;

		let block = document.createElement('div');
		block.classList = 'about-us-block';

		console.log(obj);
		obj.forEach(el => {
			const elem = this.#createElement(el);

			if (elem) {
				block.appendChild(elem);
			}
		});

		el.appendChild(block);
	}

	#createElement = elem => {
		const data = elem.data;

		switch(elem.type) {
			case 'paragraph': {
				return this.#createText(data)
			}
			case 'header': {
				return this.#createHeader(data)
			}
			case 'list': {
				return this.#createList(data)
			}
			default: {
				return '';
			}
		}
	}

	#createText = data => {
		let p = document.createElement('p');
		p.classList = 'section-body__text';

		p.innerHTML = data.text;

		return p;
	}

	#createHeader = data => {
		let p = document.createElement(`h${data.level}`);
		p.classList = `section-body__title section-body__title_${ata.level}`;

		p.innerHTML = data.text;

		return p;
	}

	#createList = data => {
		let ul = document.createElement(`ul`);
		ul.classList = `section-body__list_${data.style}`;

		let list = '';

		data.items.forEach(item => {
			list += `<li class="section-body__list_item">${item}</li>`
		});

		ul.innerHTML = list;

		return ul;
	}
}