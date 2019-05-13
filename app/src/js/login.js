;'use strict';

let newKey = document.querySelector('#newKey');
let form = document.querySelector('#login');
let action = document.querySelector('#cardAction');
let block_keys = document.querySelector('.js-key-block');

newKey.addEventListener('click', (e) => {
	if (newKey.checked) {
		const result = confirm('При создании новых ключей ваш аккаунт будет не активен примерно 10 минут и вы не сможете производить какие либо дейстия. Вы уверены, что хотите создать новые ключи?');

		if (!result) {
			e.preventDefault();
			return '';
		}

		block_keys.parentNode.removeChild(block_keys);
	} else {
		document.querySelector('#addKeysBlock').appendChild(block_keys);
	}
});

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