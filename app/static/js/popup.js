"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

var Popup = function Popup(_parent) {
  var _this = this;

  var _data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _classCallCheck(this, Popup);

  this.state = {
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
  };

  this.show = function () {
    var _this$state = _this.state,
        body = _this$state.body,
        popup = _this$state.popup,
        bacground = _this$state.bacground;
    body.appendChild(popup);
    body.appendChild(bacground);

    _classPrivateFieldLooseBase(_this, _createDescriptionBlock)[_createDescriptionBlock]();
  };

  this.hide = function () {
    var _this$state2 = _this.state,
        body = _this$state2.body,
        popup = _this$state2.popup,
        bacground = _this$state2.bacground,
        data = _this$state2.data,
        parent = _this$state2.parent;
    body.removeChild(popup);
    body.removeChild(bacground);

    if (!data.name) {
      parent.removeLastSection();
    }
  };

  this.update = function (data) {
    _this.state.data = data;
    _this.state.description = undefined;
    _this.state.popup = _classPrivateFieldLooseBase(_this, _createPopup)[_createPopup](data);

    _classPrivateFieldLooseBase(_this, _createEvents)[_createEvents]();
  };

  Object.defineProperty(this, _createPopup, {
    writable: true,
    value: function value(data) {
      var popup = document.createElement('div');
      popup.classList = 'popup';
      popup.id = 'popupId';
      popup.innerHTML = "\n\t\t\t<header class=\"popup__header\">\n\t\t\t\t<div class=\"popup__header_text\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</div>\n\t\t\t\t<div class=\"popup__close\" id=\"popupClose\"></div>\n\t\t\t</header>\n\t\t\t<section class=\"popup__body\">\n\t\t\t\t<div class=\"popup__section\">\n\t\t\t\t\t<h2 class=\"popup__section_label\">\u0418\u043C\u044F \u0441\u0435\u043A\u0446\u0438\u0438</h2>\n\t\t\t\t\t<input class=\"card__redaction_text\"\n\t\t\t\t\t\tid=\"popupNameSection\"\n\t\t\t\t\t\ttype=\"text\"\n\t\t\t\t\t\tmaxlength=\"50\"\n\t\t\t\t\t\tplaceholder=\"\u0418\u043C\u044F \u0441\u0435\u043A\u0446\u0438\u0438\"\n\n\t\t\t\t\t\tvalue=\"".concat(data.name || '', "\"\n\t\t\t\t\t/>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"popup__section\">\n\t\t\t\t\t<h2 class=\"popup__section_label\">\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</h2>\n\t\t\t\t\t<div class=\"popup__section_description\" id=\"popupDescription\"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"popup__section\">\n\t\t\t\t\t<h2 class=\"popup__section_label\">\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u0444\u0430\u0439\u043B\u044B</h2>\n\t\t\t\t\t<div class=\"popup__files\">\n\t\t\t\t\t\t<div class=\"popup__files-body\" id=\"popupFilesBody\"></div>\n\t\t\t\t\t\t<div class=\"popup__files_loads\">\n\t\t\t\t\t\t\t<input type=\"file\" name=\"popupLoadFile\" id=\"popupLoadFile\" />\n\t\t\t\t\t\t\t<label for=\"popupLoadFile\">\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</section>\n\t\t\t<footer class=\"popup__footer\">\n\t\t\t\t<button class=\"popup__action\" id=\"popupAction\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>\n\t\t\t</footer>\n\t\t");
      return popup;
    }
  });
  Object.defineProperty(this, _createBackground, {
    writable: true,
    value: function value() {
      var bg = document.createElement('span');
      bg.classList = 'popup__bacground';
      bg.addEventListener('click', _this.hide);
      return bg;
    }
  });
  Object.defineProperty(this, _save, {
    writable: true,
    value: function value() {
      var _this$state3 = _this.state,
          description = _this$state3.description,
          popup = _this$state3.popup,
          parent = _this$state3.parent;
      var name = popup.querySelector('#popupNameSection');

      if (!name.value) {
        alert('Секция обязательно должна иметь имя!');
        return;
      }

      description.save().then(function (outputData) {
        var data = {
          name: name.value,
          description: outputData.blocks
        };
        parent.updateSection(data);
        _this.state.data = data;

        _this.hide();
      })["catch"](function (error) {
        alert('Saving failed: ', error);
      });
    }
  });
  Object.defineProperty(this, _createEvents, {
    writable: true,
    value: function value() {
      var popup = _this.state.popup;
      popup.querySelector('#popupClose').addEventListener('click', _this.hide);
      popup.querySelector('#popupAction').addEventListener('click', _classPrivateFieldLooseBase(_this, _save)[_save]);
      popup.querySelector('#popupNameSection').addEventListener('keydown', function (e) {
        if (e.code == 'Enter') {
          _classPrivateFieldLooseBase(_this, _save)[_save]();
        }
      });
      popup.querySelector('#popupLoadFile').addEventListener('change', _classPrivateFieldLooseBase(_this, _addDocument)[_addDocument]);
    }
  });
  Object.defineProperty(this, _createDescriptionBlock, {
    writable: true,
    value: function value() {
      var _this$state4 = _this.state,
          popup = _this$state4.popup,
          data = _this$state4.data;
      _this.state.description = new EditorJS({
        holder: 'popupDescription',
        minHeight: 100,
        tools: {
          list: {
            "class": List,
            inlineToolbar: true
          },
          header: {
            "class": Header,
            shortcut: 'CMD+SHIFT+H'
          }
        },
        placeholder: 'Описание блока',
        data: {
          blocks: data.description
        }
      });
    }
  });
  Object.defineProperty(this, _addDocument, {
    writable: true,
    value: function value(e) {
      var target = e.target;

      if (!target.files[0]) {
        return;
      }

      _this.state.data.files.push({
        'status': 'disactive',
        'file': target.files[0]
      });

      _classPrivateFieldLooseBase(_this, _addFileIcon)[_addFileIcon](target.files[0]);

      target.value = '';
    }
  });
  Object.defineProperty(this, _addFileIcon, {
    writable: true,
    value: function value(back_img) {
      console.log(back_img);
      var popup = _this.state.popup;

      var _back_img$name$split = back_img.name.split('.'),
          _back_img$name$split2 = _slicedToArray(_back_img$name$split, 2),
          name_file = _back_img$name$split2[0],
          extension = _back_img$name$split2[1];

      var div = document.createElement('div');
      div.classList = 'popup__files_new';
      div.innerHTML = "\u0424\u0430\u0439\u043B: ".concat(name_file);
      popup.querySelector('#popupFilesBody').appendChild(div);
    }
  });
  this.state.parent = _parent;
  this.state.body = document.querySelector('body');
  this.state.data = Object.assign(this.state.data, _data);
  this.state.popup = _classPrivateFieldLooseBase(this, _createPopup)[_createPopup](this.state.data);

  _classPrivateFieldLooseBase(this, _createEvents)[_createEvents]();

  this.state.bacground = _classPrivateFieldLooseBase(this, _createBackground)[_createBackground]();
};

var _createPopup = _classPrivateFieldLooseKey("createPopup");

var _createBackground = _classPrivateFieldLooseKey("createBackground");

var _save = _classPrivateFieldLooseKey("save");

var _createEvents = _classPrivateFieldLooseKey("createEvents");

var _createDescriptionBlock = _classPrivateFieldLooseKey("createDescriptionBlock");

var _addDocument = _classPrivateFieldLooseKey("addDocument");

var _addFileIcon = _classPrivateFieldLooseKey("addFileIcon");