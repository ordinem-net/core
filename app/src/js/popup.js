class Popup {
	state = {
		parent: undefined,
		popup: undefined,
		body: undefined,
		bacground: undefined,
		description: undefined,
		data: {
			name: '',
			description: [],
			files: []
		}
	}

	constructor (parent, data={}) {
		this.state.parent = parent;
		this.state.body = document.querySelector('body');
		this.state.data = Object.assign(this.state.data, data);

		this.state.popup = this.#createPopup(this.state.data);
		this.#createEvents();

		this.state.bacground = this.#createBackground();
	}

	show = () => {
		const {body, popup, bacground} = this.state;

		body.appendChild(popup);
		body.appendChild(bacground);

		this.#createDescriptionBlock();
	}

	hide = () => {
		const {body, popup, bacground, data, parent} = this.state;

		body.removeChild(popup);
		body.removeChild(bacground);

		if (!data.name) {
			parent.removeLastSection();
		}
	}

	update = data => {
		this.state.data = data;

		this.state.description = undefined;
		this.state.popup = this.#createPopup(data);
		this.#createEvents();
	}

	#createPopup = data => {
		let popup = document.createElement('div');
		popup.classList = 'popup';
		popup.id = 'popupId';

		popup.innerHTML = `
			<header class="popup__header">
				<div class="popup__header_text">Редактировать</div>
				<div class="popup__close" id="popupClose"></div>
			</header>
			<section class="popup__body">
				<div class="popup__section">
					<h2 class="popup__section_label">Имя секции</h2>
					<input class="card__redaction_text"
						id="popupNameSection"
						type="text"
						maxlength="50"
						placeholder="Имя секции"

						value="${data.name || ''}"
					/>
				</div>
				<div class="popup__section">
					<h2 class="popup__section_label">Описание</h2>
					<div class="popup__section_description" id="popupDescription"></div>
				</div>
				<div class="popup__section">
					<h2 class="popup__section_label">Прикрепить файлы</h2>
					<div class="popup__files">
						<div class="popup__files-body" id="popupFilesBody"></div>
						<div class="popup__files_loads">
							<input type="file" name="popupLoadFile" id="popupLoadFile" />
							<label for="popupLoadFile">Загрузить</label>
						</div>
					</div>
				</div>
			</section>
			<footer class="popup__footer">
				<button class="popup__action" id="popupAction">Сохранить</button>
			</footer>
		`;

		return popup;
	}

	#createBackground = () => {
		let bg = document.createElement('span');
		bg.classList = 'popup__bacground';

		bg.addEventListener('click', this.hide);

		return bg;
	}

	#save = () => {
		const {description, popup, parent} = this.state;
		const name = popup.querySelector('#popupNameSection');

		if (!name.value) {
			alert('Секция обязательно должна иметь имя!');

			return ;
		}

		description.save().then((outputData) => {
			let data = {
				name: name.value,
				description: outputData.blocks
			}

			parent.updateSection(data);
			
			this.state.data = data;
			this.hide();
		}).catch((error) => {
  			alert('Saving failed: ', error)
		});
	}

	#createEvents = () => {
		const {popup} = this.state;

		popup.querySelector('#popupClose').addEventListener('click', this.hide);
		popup.querySelector('#popupAction').addEventListener('click', this.#save);
		popup.querySelector('#popupNameSection').addEventListener('keydown', e => {
			if (e.code == 'Enter') {
				this.#save();
			}
		});
		popup.querySelector('#popupLoadFile').addEventListener('change', this.#addDocument);
	}

	#createDescriptionBlock = () => {
		const {popup, data} = this.state;

		this.state.description = new EditorJS({
			holder: 'popupDescription',
			minHeight: 100,
			tools: {
				list: {
      				class: List,
      				inlineToolbar: true,
    			},
    			header: {
      				class: Header,
      				shortcut: 'CMD+SHIFT+H',
    			}
			},
			placeholder: 'Описание блока',
			data: {blocks: data.description}
		});
	}

	#addDocument = e => {
		let target = e.target;

		if (!target.files[0]) {
			return;
		}
  
		this.state.data.files.push({
			'status': 'disactive',
			'file': target.files[0]
		})
		this.#addFileIcon(target.files[0]);

		target.value = '';
	}

	#addFileIcon = back_img => {
		console.log(back_img);
		const {popup} = this.state;

		let [name_file, extension] = back_img.name.split('.');

		let div = document.createElement('div');
		div.classList = 'popup__files_new';
		div.innerHTML = `Файл: ${name_file}`;

		popup.querySelector('#popupFilesBody').appendChild(div);
	}
}