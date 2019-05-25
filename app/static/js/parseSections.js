"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

var ParseSections = function ParseSections(_ref) {
  var _this = this;

  var body = _ref.body,
      sections = _ref.sections;

  _classCallCheck(this, ParseSections);

  this.state = {
    body: undefined
  };
  Object.defineProperty(this, _getBlock, {
    writable: true,
    value: function value(elem) {
      return elem ? _typeof(elem) == 'object' ? elem : typeof elem == 'string' ? document.querySelector(elem) : undefined : undefined;
    }
  });
  Object.defineProperty(this, _createSection, {
    writable: true,
    value: function value(data) {
      var card = document.createElement('div');
      card.classList = 'card card_radius card_margin';
      card.innerHTML = "\n\t\t\t<h1 class=\"card__title\">".concat(data.name, "</h1>\n\t\t\t<div class=\"resume__card-body js-section\"></div>\n\t\t");
      new ParseDescription({
        el: card.querySelector('.js-section'),
        obj: data.description
      });
      return card;
    }
  });
  this.state.body = _classPrivateFieldLooseBase(this, _getBlock)[_getBlock](body);

  if (typeof sections == 'string') {
    sections = fixJsObj(sections);
  }

  sections.forEach(function (section) {
    var section_block = _classPrivateFieldLooseBase(_this, _createSection)[_createSection](section);

    _this.state.body.appendChild(section_block);
  });
};

var _getBlock = _classPrivateFieldLooseKey("getBlock");

var _createSection = _classPrivateFieldLooseKey("createSection");