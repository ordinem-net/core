'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Socket = function Socket() {
  var _this = this;

  _classCallCheck(this, Socket);

  this.state = {
    connect: undefined,
    action: false
  };

  this.test_message = function () {
    var _this$state = _this.state,
        connect = _this$state.connect,
        action = _this$state.action;

    if (action) {
      connect.emit('test', {
        data: 'I\'m connected!'
      });
    }
  };

  this.server = function () {
    var connect = _this.state.connect;
    connect.on('message', function (data) {
      console.log(data);
    });
    connect.on('change header', function (data) {
      console.log(data);
    });
  };

  this.state.connect = io.connect("http://".concat(document.domain, ":").concat(location.port));
  this.state.connect.on('connect', function () {
    _this.state.action = true;
    console.log('CONNECTED!');

    _this.server();

    _this.test_message();
  });
};