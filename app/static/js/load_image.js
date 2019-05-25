"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

var LoadImage =
/*#__PURE__*/
function () {
  function LoadImage() {
    var _this = this;

    var conf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      action: undefined,
      blocks_load: undefined,
      path: '',
      status: false,
      default_image: ''
    };

    _classCallCheck(this, LoadImage);

    this.state = {
      conf: {
        action: undefined,
        blocks_load: undefined,
        path: '',
        status: false,
        default_image: ''
      },
      action: undefined,
      blocks_load: undefined,
      default_src: []
    };

    this.sendMessage = function () {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'update';
      var file = arguments.length > 1 ? arguments[1] : undefined;
      var xhr = new XMLHttpRequest();
      var url = "/todo/update_user_photo/".concat(type);
      xhr.open('POST', url, true);

      switch (type) {
        case 'update':
          {
            var action = _this.state.action;
            var form = action.querySelector('#formUpdateUserImage');
            var formData = new FormData(form);
            xhr.send(formData);
            break;
          }

        case 'remove':
          {
            xhr.send();
            break;
          }
      }

      xhr.addEventListener('readystatechange', function (e) {
        if (xhr.readyState != 4) {
          return '';
        }

        if (xhr.status == 200) {
          console.log('IMAGE UPDATE');
          console.log(xhr.responseText);
        } else {
          console.log('ERROR send');
          console.log(xhr.status + ': ' + xhr.statusText);
        }
      });
    };

    Object.defineProperty(this, _getBlock, {
      writable: true,
      value: function value(elem) {
        return elem ? _typeof(elem) == 'object' ? elem : typeof elem == 'string' ? document.querySelectorAll(elem) : undefined : undefined;
      }
    });
    Object.defineProperty(this, _getDefaultSrc, {
      writable: true,
      value: function value() {
        var blocks_load = _this.state.blocks_load;

        for (var i = 0; i < blocks_load.length; i++) {
          _this.state.default_src.push(blocks_load[i].src);
        }
      }
    });
    Object.defineProperty(this, _createAction, {
      writable: true,
      value: function value() {
        var status = _this.state.conf.status;
        var action = _this.state.action;
        var block_action = document.createElement('form');
        block_action.action = '#';
        block_action.id = 'formUpdateUserImage';
        var block_action_child = "\n\t\t\t\t<input type=\"file\" id=\"inpFileLoad\" name=\"action_load_file\"\n\t\t\t\t\taccept=\"image/x-png,image/gif,image/jpeg\" style=\"display: none\" />\n\t\t\t\t<label for=\"inpFileLoad\" class=\"user__bth user__bth_action user__bth_margin\">\n\t\t\t\t\t".concat(status ? 'Изменить' : 'Добавить', "\n\t\t\t\t</label>\n\t\t\t");
        block_action.innerHTML = block_action_child;
        action.appendChild(block_action);

        if (status) {
          var action_remove = document.createElement('button');
          action_remove.classList = 'user__bth user__bth_remove user__bth_margin';
          action_remove.id = 'inpFileRemove';
          action_remove.innerHTML = 'Удалить';
          action.appendChild(action_remove);
        }

        _classPrivateFieldLooseBase(_this, _createEvents)[_createEvents](action);
      }
    });
    Object.defineProperty(this, _createEvents, {
      writable: true,
      value: function value(block) {
        var inp = block.querySelector('#inpFileLoad');
        var remove = block.querySelector('#inpFileRemove');
        inp.addEventListener('change', function (e) {
          var file = e.target.files[0];
          var reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onloadend = function () {
            _classPrivateFieldLooseBase(this, _updateImage)[_updateImage](reader.result);

            this.sendMessage('update', e.target.files[0]); //TODO: отправь на сервер

            _classPrivateFieldLooseBase(this, _clearAction)[_clearAction]();

            this.state.conf.status = true;

            _classPrivateFieldLooseBase(this, _createAction)[_createAction]();
          }.bind(_this);
        });

        if (remove) {
          remove.addEventListener('click', function () {
            _classPrivateFieldLooseBase(_this, _remove)[_remove]();
          });
        }
      }
    });
    Object.defineProperty(this, _updateImage, {
      writable: true,
      value: function value(src) {
        var blocks_load = _this.state.blocks_load;

        for (var i = 0; i < blocks_load.length; i++) {
          blocks_load[i].src = src;
        }
      }
    });
    Object.defineProperty(this, _clearAction, {
      writable: true,
      value: function value() {
        var action = _this.state.action;
        action.innerHTML = '';
      }
    });
    Object.defineProperty(this, _remove, {
      writable: true,
      value: function value() {
        var _this$state = _this.state,
            blocks_load = _this$state.blocks_load,
            default_src = _this$state.default_src;

        for (var i = 0; i < blocks_load.length; i++) {
          if (blocks_load[i].src != default_src[i]) {
            blocks_load[i].src = default_src[i];
          } else {
            blocks_load[i].src = _this.state.conf.default_image;
          }
        }

        _classPrivateFieldLooseBase(_this, _clearAction)[_clearAction]();

        _this.state.conf.status = false;

        _classPrivateFieldLooseBase(_this, _createAction)[_createAction]();

        _this.sendMessage('remove');
      }
    });
    this.state.conf = Object.assign(this.state.conf, conf);
    this.init(conf.action, conf.blocks_load);
  }

  _createClass(LoadImage, [{
    key: "init",
    value: function init(action, blocks_load) {
      this.state.action = _classPrivateFieldLooseBase(this, _getBlock)[_getBlock](action)[0];
      this.state.blocks_load = _classPrivateFieldLooseBase(this, _getBlock)[_getBlock](blocks_load);

      _classPrivateFieldLooseBase(this, _getDefaultSrc)[_getDefaultSrc]();

      _classPrivateFieldLooseBase(this, _createAction)[_createAction]();
    }
  }]);

  return LoadImage;
}();

var _getBlock = _classPrivateFieldLooseKey("getBlock");

var _getDefaultSrc = _classPrivateFieldLooseKey("getDefaultSrc");

var _createAction = _classPrivateFieldLooseKey("createAction");

var _createEvents = _classPrivateFieldLooseKey("createEvents");

var _updateImage = _classPrivateFieldLooseKey("updateImage");

var _clearAction = _classPrivateFieldLooseKey("clearAction");

var _remove = _classPrivateFieldLooseKey("remove");

;