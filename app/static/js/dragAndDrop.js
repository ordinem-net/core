'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

var DragAndDrop = function DragAndDrop(_name, _message, _elem) {
  var _this = this;

  _classCallCheck(this, DragAndDrop);

  this.state = {
    el: undefined,
    form: undefined,
    action: false,
    message: ''
  };

  this.init = function (name, message, elem) {
    _this.state.el = elem ? _typeof(elem) == 'object' ? elem : typeof elem == 'string' ? document.querySelector(elem) : undefined : undefined;
    _this.state.form = _classPrivateFieldLooseBase(_this, _createForm)[_createForm](name, message);
    _this.state.message = message;
  };

  Object.defineProperty(this, _createForm, {
    writable: true,
    value: function value(name, message) {
      var el = document.createElement('div');
      el.classList = 'drag-and-drop-form';
      el.innerHTML = "\n\t\t\t\t<input type=\"file\" name=\"".concat(name, "\" id=\"drAndDrp").concat(name, "\" class=\"js-dragAndDrop\" multiple />\n    \t\t\t<label class=\"drag-and-drop__label\" for=\"drAndDrp").concat(name, "\">").concat(message, "</label>\n\t\t\t");
      el.addEventListener('change', _classPrivateFieldLooseBase(_this, _changeFormForActionInp)[_changeFormForActionInp], false);
      var label = el.querySelector('label');
      label.addEventListener('mouseover', _classPrivateFieldLooseBase(_this, _showRemoveFiles)[_showRemoveFiles], false);
      label.addEventListener('mouseout', _classPrivateFieldLooseBase(_this, _unshowRemoveFiles)[_unshowRemoveFiles], false);
      label.addEventListener('click', _classPrivateFieldLooseBase(_this, _removeFiles)[_removeFiles], false);
      return el;
    }
  });
  Object.defineProperty(this, _createEvents, {
    writable: true,
    value: function value() {
      var el = _this.state.el;
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
        el.addEventListener(eventName, _classPrivateFieldLooseBase(_this, _preventDefaults)[_preventDefaults], false);
      });
      ['dragenter', 'dragover'].forEach(function (eventName) {
        el.addEventListener(eventName, _classPrivateFieldLooseBase(_this, _highlight)[_highlight], false);
      });
      ['dragleave', 'drop'].forEach(function (eventName) {
        el.addEventListener(eventName, _classPrivateFieldLooseBase(_this, _unhighlight)[_unhighlight], false);
      });
      el.addEventListener('drop', _classPrivateFieldLooseBase(_this, _handleDrop)[_handleDrop], false);
    }
  });
  Object.defineProperty(this, _preventDefaults, {
    writable: true,
    value: function value(e) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
  Object.defineProperty(this, _highlight, {
    writable: true,
    value: function value(e) {
      var form = _this.state.form;
      form.classList.add('drag-and-drop__highlight');
      form.querySelector('label').innerHTML = 'Отпустите файл!';
    }
  });
  Object.defineProperty(this, _unhighlight, {
    writable: true,
    value: function value(e) {
      var _this$state = _this.state,
          form = _this$state.form,
          message = _this$state.message;
      form.classList.remove('drag-and-drop__highlight');
      form.querySelector('label').innerHTML = message;
    }
  });
  Object.defineProperty(this, _handleDrop, {
    writable: true,
    value: function value(e) {
      var form = _this.state.form;
      var dt = e.dataTransfer;
      var files = dt.files;
      form.querySelector('input[type="file"]').files = files;

      _classPrivateFieldLooseBase(_this, _changeFormForActionInp)[_changeFormForActionInp]();
    }
  });
  Object.defineProperty(this, _changeFormForActionInp, {
    writable: true,
    value: function value() {
      var form = _this.state.form;
      _this.state.action = true;
      form.classList.add('drag-and-drop__action');
      form.querySelector('label').innerHTML = 'Файл Загружен!';
    }
  });
  Object.defineProperty(this, _removeFiles, {
    writable: true,
    value: function value(e) {
      var _this$state2 = _this.state,
          action = _this$state2.action,
          form = _this$state2.form,
          message = _this$state2.message;

      if (action) {
        form.classList.remove('drag-and-drop__remove');
        form.classList.remove('drag-and-drop__action');
        form.querySelector('label').innerHTML = message;
        form.querySelector('input[type="file"]').value = '';
        _this.state.action = false;
        e.preventDefault();
      }
    }
  });
  Object.defineProperty(this, _showRemoveFiles, {
    writable: true,
    value: function value() {
      var _this$state3 = _this.state,
          action = _this$state3.action,
          form = _this$state3.form;

      if (action) {
        form.classList.add('drag-and-drop__remove');
        form.querySelector('label').innerHTML = 'Удалить файл';
      }
    }
  });
  Object.defineProperty(this, _unshowRemoveFiles, {
    writable: true,
    value: function value() {
      var _this$state4 = _this.state,
          action = _this$state4.action,
          form = _this$state4.form;

      if (action) {
        form.classList.remove('drag-and-drop__remove');
        form.querySelector('label').innerHTML = 'Файл Загружен!';
      }
    }
  });
  this.init(_name, _message, _elem);
  this.state.el.appendChild(this.state.form);

  _classPrivateFieldLooseBase(this, _createEvents)[_createEvents]();
};

var _createForm = _classPrivateFieldLooseKey("createForm");

var _createEvents = _classPrivateFieldLooseKey("createEvents");

var _preventDefaults = _classPrivateFieldLooseKey("preventDefaults");

var _highlight = _classPrivateFieldLooseKey("highlight");

var _unhighlight = _classPrivateFieldLooseKey("unhighlight");

var _handleDrop = _classPrivateFieldLooseKey("handleDrop");

var _changeFormForActionInp = _classPrivateFieldLooseKey("changeFormForActionInp");

var _removeFiles = _classPrivateFieldLooseKey("removeFiles");

var _showRemoveFiles = _classPrivateFieldLooseKey("showRemoveFiles");

var _unshowRemoveFiles = _classPrivateFieldLooseKey("unshowRemoveFiles");