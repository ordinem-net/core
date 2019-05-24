class ParseSections {
	state = {
		body: undefined
	}
	constructor({body, sections}) {
		this.state.body = this.#getBlock(body);

		if (typeof sections == 'string') {
			sections = fixJsObj(sections);
		}

		sections.forEach(section => {
			let section_block = this.#createSection(section);
			this.state.body.appendChild(section_block);
		});
	}

	#getBlock = elem => {
		return elem ? typeof elem == 'object' ? elem : 
			typeof elem == 'string' ? document.querySelector(elem) : undefined : undefined;
	}

	#createSection = data => {
		let card = document.createElement('div');
		card.classList = 'card card_radius card_margin';

		card.innerHTML = `
			<h1 class="card__title">${data.name}</h1>
			<div class="resume__card-body js-section"></div>
		`;

		new ParseDescription({
			el: card.querySelector('.js-section'),
			obj: data.description
		})

		return card;
	}
}