class Section {
	state = {
		name: '',
		description: [],
		id: 0,
		special_id: 0,
		section: undefined,
		parent: undefined
	}

	constructor({name, description}, id, special_id, parent) {
		this.state.name = name;
		this.state.description = description;
		this.state.id = id;
		this.state.parent = parent;
		this.state.special_id = special_id;

		this.state.section = this.#createBlock();
	}

	#createBlock = () => {
		const {name, description, parent, id, special_id} = this.state;

		let section = document.createElement('div');
		section.classList = 'card card_radius card_margin card_no-padding';
		section.id = `section${special_id}`;
		section.style.padding = '0';
		section.innerHTML = `
			<header class="section__header">
				<div class="section__title js-sectionTitle">${name || ''}</div>
				<div class="section__header_action">
					<button class="section__header_bth js-changeSection">Изменить</button>
					<button class="section__header_bth js-removeSection">Удалить</button>
				</div>
			</header>
			<section class="section__body js-sectionBody"></section>
		`;

		if (description.length) {
			new ParseDescription({
				el: section.querySelector('.js-sectionBody'),
				obj: description
			});
		} else {
			section.querySelector('.js-sectionBody').innerHTML = `
				<h2 class="section-body__title section-body__title_center">Секция пустая!</h2>
				<p class="section-body__text section-body__text_center">Добавьте ей описания</p>
				<p class="section-body__text section-body__text_center">Чтобы стало понятно, какое это ваше личное достижение</p>
			`;
		}

		section.querySelector('.js-changeSection')
			.addEventListener('click', () => parent.showPopup(id, this.state.section));

		section.querySelector('.js-removeSection')
			.addEventListener('click', () => parent.removeSection(id, this.state.section));

		return section;
	}

	update = data => {
		this.state.name = data.name || this.state.name;
		this.state.description = data.description || this.state.description;

		const {section} = this.state;

		section.querySelector('.js-sectionTitle').innerHTML = this.state.name;
		section.querySelector('.js-sectionBody').innerHTML = '';

		new ParseDescription({
				el: section.querySelector('.js-sectionBody'),
				obj: this.state.description
			});
	}
}









class SectionManager {
	state = {
		body: undefined,
		add_action: undefined,
		nav: undefined,
		banner: undefined,
		sectionsData: [],
		popup: undefined,
		sections: [],
		save_bth: undefined,
		action_id: -1
	}

	constructor({body, action_add, nav, sections, save}) {
		this.state.popup = new Popup(this);

		this.state.body = this.#getBlock(body);
		this.state.nav = this.#getBlock(nav);
		this.state.add_action = this.#getBlock(action_add);
		this.state.save_bth = this.#getBlock(save);

		if (typeof sections == 'string') {
			sections = fixJsObj(sections);
		}

		sections.forEach(section => {
			this.state.sectionsData.push(section);
		});

		if (this.state.add_action) {
			this.state.add_action.addEventListener('click', () => {
				const {popup} = this.state;

				if (this.state.banner) {
					this.state.banner.parentNode.removeChild(this.state.banner);
					this.state.banner = undefined;
				}

				this.state.save_bth.style.display = '';

				const data = {name: '', description: [], files: []};

				let special_id = 0;
				if (this.state.sections.length) {
					special_id = this.state.sections[this.state.sections.length - 1].state.special_id  + 1;
				}

				const new_section = new Section(data, this.state.sections.length, special_id, this);
				
				this.state.sections.push(new_section);
				this.state.sectionsData.push(data);
				this.state.body.appendChild(new_section.state.section);

				this.state.action_id = this.state.sections.length - 1;

				let nav_item = document.createElement('a');
				nav_item.classList = 'navigation__item';
				nav_item.id = `linkToSection${special_id}`;
				nav_item.href = `#section${special_id}`;

				this.state.nav.appendChild(nav_item);


				popup.update(data);
				popup.show();
			});
		}

		if (this.state.sectionsData.length) {
			let special_id = -1;

			this.state.sectionsData.forEach(el => {
				special_id += 1;
				let section = new Section(el, this.state.sections.length, special_id, this);

				this.state.sections.push(section);
				this.state.body.appendChild(section.state.section);

				let nav_item = document.createElement('a');
				nav_item.classList = 'navigation__item';
				nav_item.id = `linkToSection${special_id}`;
				nav_item.href = `#section${special_id}`;
				nav_item.innerHTML = el.name;

				this.state.nav.appendChild(nav_item);
			});
		} else {
			this.#appendBanner();
			this.state.save_bth.style.display = 'none';
		}

		if (this.state.save_bth) {
			this.state.save_bth.addEventListener('click', () => {
				let xhr = new XMLHttpRequest();

				xhr.open('POST', '/todo/edit_sections', true);
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.send(JSON.stringify(this.state.sectionsData));

				xhr.addEventListener('readystatechange', function(e) {
					if (xhr.readyState != 4) {
						return '';
					}

    				if (xhr.status == 200) {
    					console.log(xhr.responseText);
    					alert('Обновления успешно сохранены!');
    				}
    				else {
    				console.log('ERROR send');
    				console.log(xhr.status + ': ' + xhr.statusText);
    				}
  				});

  		// 		var formdata = new FormData();
				// let filedata = document.querySelector('#a23');
				// var i = 0, len = filedata.files.length, file;
				// for (; i < len; i++) {
    // 				file = filedata.files[i];
    // 				formdata.append("file", file);
				// }

				// let xhr2 = new XMLHttpRequest();

				// xhr2.open('POST', '/todo/edit_sections_file', true);
				// console.log('a222222222');

				// xhr2.send(formdata);
				// xhr2.addEventListener('readystatechange', function(e) {
				// 	if (xhr.readyState != 4) {
				// 		return '';
				// 	}

    // 				if (xhr.status == 200) {
    // 					console.log(xhr.readyState);
    // 					console.log(xhr.responseText);
    // 					alert('Обновления22222 успешно сохранены!');
    // 				}
    // 				else {
    // 				console.log('ERROR22222 send');
    // 				console.log(xhr.status + ': ' + xhr.statusText);
    // 				}
  		// 		});
			});
		}
	}

	showPopup = (id, el) => {
		const {popup, sections} = this.state;

		let id_new = -1;

		for (let i = 0; i < sections.length; i++) {
			if (sections[i].state.section == el) {
				id_new = i;
				break;
			}
		}

		const info_section = this.state.sectionsData[id_new];

		this.state.action_id = id_new;

		popup.update(info_section);
		popup.show();
	}

	updateSection = data => {
		const {action_id, sections, nav} = this.state;

		this.state.sectionsData[action_id] = data;
		sections[action_id].update(data);

		console.log('!11111!!!!!');

		let special_id = sections[action_id].state.special_id;

		console.log(data);

		nav.querySelector(`#linkToSection${special_id}`).innerHTML = data.name;

		console.log('a2222');

		this.state.action_id = -1;
	}

	removeSection = (id, el) => {
		const {body, sections, nav} = this.state;

		if (confirm('Вы уверены, что хотите удалить данную секцию?')) {
			let id_new = -1;

			for (let i = 0; i < sections.length; i++) {
				if (sections[i].state.section == el) {
					id_new = i;
					break;
				}
			}

			let special_id = sections[id_new].state.special_id;
			let nav_el = nav.querySelector(`#linkToSection${special_id}`);
			nav.removeChild(nav_el);

			body.removeChild(sections[id_new].state.section);

			this.state.sections.splice(id_new, 1);
			this.state.sectionsData.splice(id_new, 1);

			if (!this.state.sections.length) {
				this.#appendBanner();
				this.state.save_bth.style.display = 'none';
			}
		}
	}

	removeLastSection = () => {
		const {body, sections, nav} = this.state;

		let id = sections.length - 1;

		let special_id = sections[id].state.special_id;
		let nav_el = nav.querySelector(`#linkToSection${special_id}`);
		nav.removeChild(nav_el);

		body.removeChild(sections[id].state.section);

		this.state.sections.splice(id, 1);
		this.state.sectionsData.splice(id, 1);

		if (!this.state.sections.length) {
			this.#appendBanner();
			this.state.save_bth.style.display = 'none';
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