"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

var Section = function Section(_ref, _id, _special_id, _parent) {
  var _this = this;

  var _name = _ref.name,
      _description = _ref.description;

  _classCallCheck(this, Section);

  this.state = {
    name: '',
    description: [],
    id: 0,
    special_id: 0,
    section: undefined,
    parent: undefined
  };
  Object.defineProperty(this, _createBlock, {
    writable: true,
    value: function value() {
      var _this$state = _this.state,
          name = _this$state.name,
          description = _this$state.description,
          parent = _this$state.parent,
          id = _this$state.id,
          special_id = _this$state.special_id;
      var section = document.createElement('div');
      section.classList = 'card card_radius card_margin card_no-padding';
      section.id = "section".concat(special_id);
      section.style.padding = '0';
      section.innerHTML = "\n\t\t\t<header class=\"section__header\">\n\t\t\t\t<div class=\"section__title js-sectionTitle\">".concat(name || '', "</div>\n\t\t\t\t<div class=\"section__header_action\">\n\t\t\t\t\t<button class=\"section__header_bth js-changeSection\">\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C</button>\n\t\t\t\t\t<button class=\"section__header_bth js-removeSection\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>\n\t\t\t\t</div>\n\t\t\t</header>\n\t\t\t<section class=\"section__body js-sectionBody\"></section>\n\t\t");

      if (description.length) {
        new ParseDescription({
          el: section.querySelector('.js-sectionBody'),
          obj: description
        });
      } else {
        section.querySelector('.js-sectionBody').innerHTML = "\n\t\t\t\t<h2 class=\"section-body__title section-body__title_center\">\u0421\u0435\u043A\u0446\u0438\u044F \u043F\u0443\u0441\u0442\u0430\u044F!</h2>\n\t\t\t\t<p class=\"section-body__text section-body__text_center\">\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0435\u0439 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u044F</p>\n\t\t\t\t<p class=\"section-body__text section-body__text_center\">\u0427\u0442\u043E\u0431\u044B \u0441\u0442\u0430\u043B\u043E \u043F\u043E\u043D\u044F\u0442\u043D\u043E, \u043A\u0430\u043A\u043E\u0435 \u044D\u0442\u043E \u0432\u0430\u0448\u0435 \u043B\u0438\u0447\u043D\u043E\u0435 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0435</p>\n\t\t\t";
      }

      section.querySelector('.js-changeSection').addEventListener('click', function () {
        return parent.showPopup(id, _this.state.section);
      });
      section.querySelector('.js-removeSection').addEventListener('click', function () {
        return parent.removeSection(id, _this.state.section);
      });
      return section;
    }
  });

  this.update = function (data) {
    _this.state.name = data.name || _this.state.name;
    _this.state.description = data.description || _this.state.description;
    var section = _this.state.section;
    section.querySelector('.js-sectionTitle').innerHTML = _this.state.name;
    section.querySelector('.js-sectionBody').innerHTML = '';
    new ParseDescription({
      el: section.querySelector('.js-sectionBody'),
      obj: _this.state.description
    });
  };

  this.state.name = _name;
  this.state.description = _description;
  this.state.id = _id;
  this.state.parent = _parent;
  this.state.special_id = _special_id;
  this.state.section = _classPrivateFieldLooseBase(this, _createBlock)[_createBlock]();
};

var _createBlock = _classPrivateFieldLooseKey("createBlock");

var SectionManager = function SectionManager(_ref2) {
  var _this2 = this;

  var _body = _ref2.body,
      action_add = _ref2.action_add,
      _nav = _ref2.nav,
      _sections = _ref2.sections,
      save = _ref2.save;

  _classCallCheck(this, SectionManager);

  this.state = {
    body: undefined,
    add_action: undefined,
    nav: undefined,
    banner: undefined,
    sectionsData: [],
    popup: undefined,
    sections: [],
    save_bth: undefined,
    action_id: -1
  };

  this.showPopup = function (id, el) {
    var _this2$state = _this2.state,
        popup = _this2$state.popup,
        sections = _this2$state.sections;
    var id_new = -1;

    for (var i = 0; i < sections.length; i++) {
      if (sections[i].state.section == el) {
        id_new = i;
        break;
      }
    }

    var info_section = _this2.state.sectionsData[id_new];
    _this2.state.action_id = id_new;
    popup.update(info_section);
    popup.show();
  };

  this.updateSection = function (data) {
    var _this2$state2 = _this2.state,
        action_id = _this2$state2.action_id,
        sections = _this2$state2.sections,
        nav = _this2$state2.nav;
    _this2.state.sectionsData[action_id] = data;
    sections[action_id].update(data);
    console.log('!11111!!!!!');
    var special_id = sections[action_id].state.special_id;
    console.log(data);
    nav.querySelector("#linkToSection".concat(special_id)).innerHTML = data.name;
    console.log('a2222');
    _this2.state.action_id = -1;
  };

  this.removeSection = function (id, el) {
    var _this2$state3 = _this2.state,
        body = _this2$state3.body,
        sections = _this2$state3.sections,
        nav = _this2$state3.nav;

    if (confirm('Вы уверены, что хотите удалить данную секцию?')) {
      var id_new = -1;

      for (var i = 0; i < sections.length; i++) {
        if (sections[i].state.section == el) {
          id_new = i;
          break;
        }
      }

      var special_id = sections[id_new].state.special_id;
      var nav_el = nav.querySelector("#linkToSection".concat(special_id));
      nav.removeChild(nav_el);
      body.removeChild(sections[id_new].state.section);

      _this2.state.sections.splice(id_new, 1);

      _this2.state.sectionsData.splice(id_new, 1);

      if (!_this2.state.sections.length) {
        _classPrivateFieldLooseBase(_this2, _appendBanner)[_appendBanner]();

        _this2.state.save_bth.style.display = 'none';
      }
    }
  };

  this.removeLastSection = function () {
    var _this2$state4 = _this2.state,
        body = _this2$state4.body,
        sections = _this2$state4.sections,
        nav = _this2$state4.nav;
    var id = sections.length - 1;
    var special_id = sections[id].state.special_id;
    var nav_el = nav.querySelector("#linkToSection".concat(special_id));
    nav.removeChild(nav_el);
    body.removeChild(sections[id].state.section);

    _this2.state.sections.splice(id, 1);

    _this2.state.sectionsData.splice(id, 1);

    if (!_this2.state.sections.length) {
      _classPrivateFieldLooseBase(_this2, _appendBanner)[_appendBanner]();

      _this2.state.save_bth.style.display = 'none';
    }
  };

  Object.defineProperty(this, _getBlock, {
    writable: true,
    value: function value(elem) {
      return elem ? _typeof(elem) == 'object' ? elem : typeof elem == 'string' ? document.querySelector(elem) : undefined : undefined;
    }
  });
  Object.defineProperty(this, _appendBanner, {
    writable: true,
    value: function value() {
      var banner = document.createElement('div');
      banner.classList = 'card card_radius card_center';
      banner.style.height = '300px';
      banner.innerHTML = "\n\t\t<h3 class=\"resume__card_no-content_title\">\n\t\t\t\u0412 \u0434\u0430\u043D\u043D\u044B\u0439 \u043C\u043E\u043C\u0435\u043D\u0442 \u0441\u0435\u043A\u0446\u0438\u0438 \u0441 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0435\u0439 \u043E\u0442\u0441\u0443\u0442\u0441\u0432\u0443\u044E\u0442\n\t\t</h3>\n\t\t<p class=\"resume__card_no-content_text\">\u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u043D\u043E\u0432\u0443\u044E \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443</p>\n\t\t<p class=\"resume__card_no-content_text\">\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u0441\u0432\u043E\u0438 \u043D\u0430\u0432\u044B\u043A\u0438 \u0438 \u0443\u043C\u0435\u043D\u0438\u044F</p>";
      _this2.state.banner = banner;

      _this2.state.body.appendChild(banner);
    }
  });
  this.state.popup = new Popup(this);
  this.state.body = _classPrivateFieldLooseBase(this, _getBlock)[_getBlock](_body);
  this.state.nav = _classPrivateFieldLooseBase(this, _getBlock)[_getBlock](_nav);
  this.state.add_action = _classPrivateFieldLooseBase(this, _getBlock)[_getBlock](action_add);
  this.state.save_bth = _classPrivateFieldLooseBase(this, _getBlock)[_getBlock](save);

  if (typeof _sections == 'string') {
    _sections = fixJsObj(_sections);
  }

  _sections.forEach(function (section) {
    _this2.state.sectionsData.push(section);
  });

  if (this.state.add_action) {
    this.state.add_action.addEventListener('click', function () {
      var popup = _this2.state.popup;

      if (_this2.state.banner) {
        _this2.state.banner.parentNode.removeChild(_this2.state.banner);

        _this2.state.banner = undefined;
      }

      _this2.state.save_bth.style.display = '';
      var data = {
        name: '',
        description: [],
        files: []
      };
      var special_id = 0;

      if (_this2.state.sections.length) {
        special_id = _this2.state.sections[_this2.state.sections.length - 1].state.special_id + 1;
      }

      var new_section = new Section(data, _this2.state.sections.length, special_id, _this2);

      _this2.state.sections.push(new_section);

      _this2.state.sectionsData.push(data);

      _this2.state.body.appendChild(new_section.state.section);

      _this2.state.action_id = _this2.state.sections.length - 1;
      var nav_item = document.createElement('a');
      nav_item.classList = 'navigation__item';
      nav_item.id = "linkToSection".concat(special_id);
      nav_item.href = "#section".concat(special_id);

      _this2.state.nav.appendChild(nav_item);

      popup.update(data);
      popup.show();
    });
  }

  if (this.state.sectionsData.length) {
    var special_id = -1;
    this.state.sectionsData.forEach(function (el) {
      special_id += 1;
      var section = new Section(el, _this2.state.sections.length, special_id, _this2);

      _this2.state.sections.push(section);

      _this2.state.body.appendChild(section.state.section);

      var nav_item = document.createElement('a');
      nav_item.classList = 'navigation__item';
      nav_item.id = "linkToSection".concat(special_id);
      nav_item.href = "#section".concat(special_id);
      nav_item.innerHTML = el.name;

      _this2.state.nav.appendChild(nav_item);
    });
  } else {
    _classPrivateFieldLooseBase(this, _appendBanner)[_appendBanner]();

    this.state.save_bth.style.display = 'none';
  }

  if (this.state.save_bth) {
    this.state.save_bth.addEventListener('click', function () {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/todo/edit_sections', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(_this2.state.sectionsData));
      xhr.addEventListener('readystatechange', function (e) {
        if (xhr.readyState != 4) {
          return '';
        }

        if (xhr.status == 200) {
          console.log(xhr.responseText);
          alert('Обновления успешно сохранены!');
        } else {
          console.log('ERROR send');
          console.log(xhr.status + ': ' + xhr.statusText);
        }
      }); // 		var formdata = new FormData();
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
};

var _getBlock = _classPrivateFieldLooseKey("getBlock");

var _appendBanner = _classPrivateFieldLooseKey("appendBanner");