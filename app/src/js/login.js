;'use strict';

let form = document.querySelector('#login');
let action = document.querySelector('#cardAction');
let block_keys = document.querySelector('.js-key-block');

action.addEventListener('click', (e) => {
	let inputs = form.querySelectorAll('input');
	let not_check = false;

	for (let i = 0; i < inputs.length; i++) {
		if (!inputs[i].value) {
			not_check = true;

			if (inputs[i].type != 'file') {
				inputs[i].classList.add('card__input_not-value');
			}
		}
	}

	if (not_check) {
		e.preventDefault();
		alert('Не все поля заполнены!');
		return;
	}
});