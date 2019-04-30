let form = document.querySelector('#registration');
let action = document.querySelector('#cardAction');

action.addEventListener('click', (e) => {
	let inputs = form.querySelectorAll('input');
	let not_check = false;

	for (let i = 0; i < inputs.length; i++) {
		if (inputs[i].required && !inputs[i].value) {
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