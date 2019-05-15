class Popup {
	state = {
		element: undefined,
		popup: undefined,
		position: {}
	}

	constructor({element, li}) {
		if (!element || !this.#isDOM(element)) {
			throw new Erorr('Object for popup is undefined!');
			return;
		}

		this.state.element = element;
		this.createPopup(this.state.element, li);
		this.#addEventElement();
	}

	createPopup = (el, list) => {
		const {element} = this.state;

		let popup = document.createElement('div');
		popup.classList = 'popup';
		popup.style=`position: absolute; top: ${element.clientTop}px; left: ${element.clientLeft}px; z-index: 2;`

		let html = '<ul>';

		list.forEach((el) => {
			html += this.#templateElement(el)
		});

		html += '</ul>';

		popup.innerHTML = html;
		console.dir(element);
		document.querySelector('body').appendChild(popup);
		console.log(popup);
	}

	#isDOM = (el) => {
		return /HTML/.test( {}.toString.call(el) );
	}

	#addEventElement = () => {
		const {element} = this.state;

		if (!element) {
			return;
		}

		element.addEventListener('mouseover', () => {
			this.#active();
		});

		element.addEventListener('mouseout', () => {
			this.#disactive();
		});
	}

	#active = () => {

	}

	#disactive = () => {

	}

	#templateElement = el => {
		return `
		<li class="popup__link">
			<a href="${el.url}" class="popup__link-i">
				${el.title}
			</a>
		</li>`;
	}
}