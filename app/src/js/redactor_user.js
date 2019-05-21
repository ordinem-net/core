'use strict';

const bth = document.querySelector('#redactionUser');
const form = document.querySelector('#formUser');

const inp_number = document.querySelectorAll('input[type="number"].jsInputForm');
for (let i = 0; i < inp_number.length; i++ ) {
	inp_number[i].addEventListener('blur', ({target}) => {
		if (+target.value < +target.min) {
			target.value = target.min;
		}

		if (+target.value > +target.max) {
			target.value = target.max;
		}
	});
}

bth.addEventListener('click', () => {
	editor.save().then((outputData) => {
		getForm([{name: 'about_us', value: outputData.blocks}]);
	}).catch((error) => {
  		alert('Saving failed: ', error)
	});
});

const getForm = (prevData=[]) => {
	const data = {
		type: global_edit_name
	};

	if (prevData) {
		prevData.forEach(({name, value}) => {
			data[name] = value;
		});
	}

	const inputs = form.querySelectorAll('.jsInputForm');

	for (let i = 0; i < inputs.length; i++) {
		let name = inputs[i].parentNode.dataset.name;

		switch(inputs[i].type) {
			case 'text': {
				if (!data[name]) {
					data[name] = {}
				}

				data[name][inputs[i].name] = inputs[i].value;
				break;
			}
			case 'radio': {
				if (!data[name]) {
					data[name] = {}
				}

				if (inputs[i].checked) {
					data[name][inputs[i].name] = inputs[i].value;
				}
				break;
			}
			case 'number': {
				if (!inputs[i].value) {
					break;
				}

				if (!data[name]) {
					data[name] = {}
				}

				if (+inputs[i].value < +inputs[i].min) {
					data[name][inputs[i].name] = inputs[i].min;
				}else if (+inputs[i].value > +inputs[i].max) {
					data[name][inputs[i].name] = inputs[i].max;
				} else {
					data[name][inputs[i].name] = +inputs[i].value;
				}

				break;
			}
		}
	}

	sendMessage('/todo/edit_profile', data);
}

const sendMessage = (path, data) => {
	let xhr = new XMLHttpRequest();

	xhr.open('POST', path, true)
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(JSON.stringify(data))

	xhr.onreadystatechange = () => {
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {
    		console.log(xhr.status + ': ' + xhr.statusText);
  		} else {
  			alert('Ваши изменения сохранены. Они в ближайшее время будут доступны всем.');
    		console.log(xhr.responseText);
  		}
	}
}