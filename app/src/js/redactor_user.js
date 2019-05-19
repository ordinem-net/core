'use strict';

const bth = document.querySelector('#redactionUser');

bth.addEventListener('click', () => {
	editor.save().then((outputData) => {
		if (outputData.blocks.length) {
			getForm([{name: 'about_us', value: outputData}]);
		} else {
			getForm();
		}
	}).catch((error) => {
  		console.log('Saving failed: ', error)
	});
})

const getForm = (prevData=[]) => {
	const data = {};

	if (prevData) {
		prevData.forEach(({name, value}) => {
			data[name] = value;
		});
	}

	console.log(data)
}