"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

var ParseDescription = function ParseDescription(_ref) {
  var _this = this;

  var _el = _ref.el,
      _obj = _ref.obj;

  _classCallCheck(this, ParseDescription);

  this.state = {
    obj: undefined,
    el: undefined
  };

  this.init_elem = function (elem) {
    _this.state.el = elem ? _typeof(elem) == 'object' ? elem : typeof elem == 'string' ? document.querySelector(elem) : undefined : undefined;

    if (_this.state.el) {
      _classPrivateFieldLooseBase(_this, _start)[_start]();
    }
  };

  Object.defineProperty(this, _start, {
    writable: true,
    value: function value() {
      var _this$state = _this.state,
          obj = _this$state.obj,
          el = _this$state.el;
      var block = document.createElement('div');
      block.classList = 'about-us-block';

      if (!obj.length) {
        block.innerHTML = _classPrivateFieldLooseBase(_this, _createBanner)[_createBanner]();
      } else {
        obj.forEach(function (el) {
          var elem = _classPrivateFieldLooseBase(_this, _createElement)[_createElement](el);

          if (elem) {
            block.appendChild(elem);
          }
        });
      }

      el.appendChild(block);
    }
  });
  Object.defineProperty(this, _createBanner, {
    writable: true,
    value: function value() {
      return "\n\t\t\t<h2 class=\"section-body__title section-body__title_center\">\u0421\u0435\u043A\u0446\u0438\u044F \u043F\u0443\u0441\u0442\u0430\u044F!</h2>\n\t\t\t<p class=\"section-body__text section-body__text_center\">\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0435\u0439 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u044F</p>\n\t\t\t<p class=\"section-body__text section-body__text_center\">\u0427\u0442\u043E\u0431\u044B \u0441\u0442\u0430\u043B\u043E \u043F\u043E\u043D\u044F\u0442\u043D\u043E, \u043A\u0430\u043A\u043E\u0435 \u044D\u0442\u043E \u0432\u0430\u0448\u0435 \u043B\u0438\u0447\u043D\u043E\u0435 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0435</p>\n\t\t";
    }
  });
  Object.defineProperty(this, _createElement, {
    writable: true,
    value: function value(elem) {
      var data = elem.data;

      switch (elem.type) {
        case 'paragraph':
          {
            return _classPrivateFieldLooseBase(_this, _createText)[_createText](data);
          }

        case 'header':
          {
            return _classPrivateFieldLooseBase(_this, _createHeader)[_createHeader](data);
          }

        case 'list':
          {
            return _classPrivateFieldLooseBase(_this, _createList)[_createList](data);
          }

        default:
          {
            return '';
          }
      }
    }
  });
  Object.defineProperty(this, _createText, {
    writable: true,
    value: function value(data) {
      var p = document.createElement('p');
      p.classList = 'section-body__text';
      p.innerHTML = data.text;
      return p;
    }
  });
  Object.defineProperty(this, _createHeader, {
    writable: true,
    value: function value(data) {
      var p = document.createElement("h".concat(data.level));
      p.classList = "section-body__title section-body__title_".concat(data.level);
      p.innerHTML = data.text;
      return p;
    }
  });
  Object.defineProperty(this, _createList, {
    writable: true,
    value: function value(data) {
      var ul = document.createElement("ul");
      ul.classList = "section-body__list_".concat(data.style);
      var list = '';
      data.items.forEach(function (item) {
        list += "<li class=\"section-body__list_item\">".concat(item, "</li>");
      });
      ul.innerHTML = list;
      return ul;
    }
  });

  if (typeof _obj == 'string') {
    this.state.obj = fixJsObj(_obj);
  } else {
    this.state.obj = _obj;
  }

  this.init_elem(_el);
};

var _start = _classPrivateFieldLooseKey("start");

var _createBanner = _classPrivateFieldLooseKey("createBanner");

var _createElement = _classPrivateFieldLooseKey("createElement");

var _createText = _classPrivateFieldLooseKey("createText");

var _createHeader = _classPrivateFieldLooseKey("createHeader");

var _createList = _classPrivateFieldLooseKey("createList");