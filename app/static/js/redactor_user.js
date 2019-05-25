'use strict';

var bth = document.querySelector('#redactionUser');
var form = document.querySelector('#formUser');
var inp_number = document.querySelectorAll('input[type="number"].jsInputForm');

for (var i = 0; i < inp_number.length; i++) {
  inp_number[i].addEventListener('blur', function (_ref) {
    var target = _ref.target;

    if (+target.value < +target.min) {
      target.value = target.min;
    }

    if (+target.value > +target.max) {
      target.value = target.max;
    }
  });
}

bth.addEventListener('click', function () {
  editor.save().then(function (outputData) {
    getForm([{
      name: 'about_us',
      value: outputData.blocks
    }]);
  })["catch"](function (error) {
    alert('Saving failed: ', error);
  });
});

var getForm = function getForm() {
  var prevData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var data = {
    type: global_edit_name
  };

  if (prevData) {
    prevData.forEach(function (_ref2) {
      var name = _ref2.name,
          value = _ref2.value;
      data[name] = value;
    });
  }

  var inputs = form.querySelectorAll('.jsInputForm');

  for (var _i = 0; _i < inputs.length; _i++) {
    var name = inputs[_i].parentNode.dataset.name;

    switch (inputs[_i].type) {
      case 'text':
        {
          if (!data[name]) {
            data[name] = {};
          }

          data[name][inputs[_i].name] = inputs[_i].value;
          break;
        }

      case 'radio':
        {
          if (!data[name]) {
            data[name] = {};
          }

          if (inputs[_i].checked) {
            data[name][inputs[_i].name] = inputs[_i].value;
          }

          break;
        }

      case 'number':
        {
          if (!inputs[_i].value) {
            break;
          }

          if (!data[name]) {
            data[name] = {};
          }

          if (+inputs[_i].value < +inputs[_i].min) {
            data[name][inputs[_i].name] = inputs[_i].min;
          } else if (+inputs[_i].value > +inputs[_i].max) {
            data[name][inputs[_i].name] = inputs[_i].max;
          } else {
            data[name][inputs[_i].name] = +inputs[_i].value;
          }

          break;
        }
    }
  }

  sendMessage('/todo/edit_profile', data);
};

var sendMessage = function sendMessage(path, data) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', path, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(data));

  xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    } else {
      alert('Ваши изменения сохранены. Они в ближайшее время будут доступны всем.');
      console.log(xhr.responseText);
    }
  };
};