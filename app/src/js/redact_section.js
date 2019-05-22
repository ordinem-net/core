class Section {
	state = {
		id: 0,
		obj: undefined,
	}

	constructor(id) {
		this.state.id = id;

		this.#template();
	}

	#template = () => {
		let div = document.createElement('div');
		div.classList = 'card card_radius card_center';

		div.innerHTML = `
			<header class="card__section_header">ffff</header>
		`;

		this.state.obj = div;

		return div;
	}
}

class SectionManager {
	state = {
		body: undefined,
		add_action: undefined,
		nav: undefined,
		banner: undefined,
		sections: []
	}

	constructor({body, action_add, nav, sectionsInfo}) {
		this.state.body = this.#getBlock(body);
		this.state.nav = this.#getBlock(nav);
		this.state.add_action = this.#getBlock(action_add);

		if (this.state.add_action) {
			this.state.add_action.addEventListener('click', () => {
				let section = new Section(
					this.state.sections.length,
					this.state.body
				);

				this.state.body.appendChild(section.state.obj);
				this.state.sections.push(section)
			});
		}

		if (!this.state.sections.length) {
			this.#appendBanner();
		}
	}

	#getBlock = elem => {
		return elem ? typeof elem == 'object' ? elem : 
			typeof elem == 'string' ? document.querySelector(elem) : undefined : undefined;
	}

	#appendBanner = () => {
		let banner = document.createElement('div');

		banner.classList = 'card card_radius card_center';
		banner.style.height = '300px';

		banner.innerHTML = `
		<h3 class="resume__card_no-content_title">
			В данный момент секции с информацией отсутсвуют
		</h3>
		<p class="resume__card_no-content_text">Создайте новую карточку</p>
		<p class="resume__card_no-content_text">Опишите свои навыки и умения</p>`;

		this.state.banner = banner;

		this.state.body.appendChild(banner);
	}
}