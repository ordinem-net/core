'use strict';

let newKey = document.querySelector('#newKey');
let form = document.querySelector('#login');
let action = document.querySelector('#cardAction');

console.log(form);

newKey.addEventListener('click', (e) => {
	if (newKey.checked) {
		const result = confirm('При создании новых ключей ваш аккаунт будет не активен примерно 10 минут и вы не сможете производить какие либо дейстия. Вы уверены, что хотите создать новые ключи?');

		if (!result) {
			e.preventDefault();
		}
	}
});

action.addEventListener('click', (e) => {
	let inputs = form.querySelectorAll('input');
	let not_check = false;

	for (let i = 0; i < inputs.length; i++) {
		if (!inputs[i].value) {
			not_check = true
			inputs[i].classList.add('card__input_not-value');
		}
	}

	if (not_check) {
		e.preventDefault();
		alert('Не все поля заполнены!');
		return;
	}
});