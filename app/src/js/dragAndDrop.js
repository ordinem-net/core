'use strict';

class DragAndDrop {
	state = {
		el: undefined,
		form: undefined,
		action: false,
		message: ''
	}

	constructor(name, message, elem) {
		this.init(name, message, elem);

		this.state.el.appendChild(this.state.form);

		this.#createEvents();
	}

	init = (name, message, elem) => {
		this.state.el = elem ? typeof elem == 'object' ? elem : 
			typeof elem == 'string' ? document.querySelector(elem) : undefined : undefined;

		this.state.form = this.#createForm(name, message);

		this.state.message = message;
	}

	#createForm = (name, message) => {
			let el = document.createElement('div');
			el.classList = 'drag-and-drop-form';

			el.innerHTML = `
				<input type="file" name="${name}" id="drAndDrp${name}" class="js-dragAndDrop" multiple />
    			<label class="drag-and-drop__label" for="drAndDrp${name}">${message}</label>
			`;

			el.addEventListener('change', this.#changeFormForActionInp, false);

			let label = el.querySelector('label');
			label.addEventListener('mouseover', this.#showRemoveFiles, false);
			label.addEventListener('mouseout', this.#unshowRemoveFiles, false);
			label.addEventListener('click', this.#removeFiles, false);

			return el;
		};

	#createEvents = () => {
		const {el} = this.state;

		['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  			el.addEventListener(eventName, this.#preventDefaults, false)
		});

		['dragenter', 'dragover'].forEach(eventName => {
  			el.addEventListener(eventName, this.#highlight, false)
		});

		['dragleave', 'drop'].forEach(eventName => {
  			el.addEventListener(eventName, this.#unhighlight, false)
		});

		el.addEventListener('drop', this.#handleDrop, false)
	}

	#preventDefaults = e => {
		e.preventDefault();
  		e.stopPropagation();
	}

	#highlight = e => {
		const {form} = this.state;

		form.classList.add('drag-and-drop__highlight');
		form.querySelector('label').innerHTML = 'Отпустите файл!';
	}

	#unhighlight = e => {
		const {form, message} = this.state;

		form.classList.remove('drag-and-drop__highlight');
		form.querySelector('label').innerHTML = message;
	}

	#handleDrop = e => {
		const {form} = this.state;

		let dt = e.dataTransfer;
  		let files = dt.files;

  		form.querySelector('input[type="file"]').files = files;

  		this.#changeFormForActionInp();
	}

	#changeFormForActionInp = () => {
		const {form} = this.state;

		this.state.action = true;

		form.classList.add('drag-and-drop__action');
		form.querySelector('label').innerHTML = 'Файл Загружен!';
	}

	#removeFiles = e => {
		const {action, form, message} = this.state;

		if (action) {
			form.classList.remove('drag-and-drop__remove');
			form.classList.remove('drag-and-drop__action');

			form.querySelector('label').innerHTML = message;
			form.querySelector('input[type="file"]').value = '';

			this.state.action = false;

			e.preventDefault();
		}
	}

	#showRemoveFiles = () => {
		const {action, form} = this.state;

		if (action) {
			form.classList.add('drag-and-drop__remove');
			form.querySelector('label').innerHTML = 'Удалить файл';
		}
	}

	#unshowRemoveFiles = () => {
		const {action, form} = this.state;

		if (action) {
			form.classList.remove('drag-and-drop__remove');
			form.querySelector('label').innerHTML = 'Файл Загружен!';
		}
	}
}