"use strict";

;
'use strict';

var form = document.querySelector('#login');
var action = document.querySelector('#cardAction');
var block_keys = document.querySelector('.js-key-block');
action.addEventListener('click', function (e) {
  var inputs = form.querySelectorAll('input');
  var not_check = false;

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type == 'file' && !inputs[i].files) {
      not_check = true;

      if (inputs[i].type != 'file') {
        inputs[i].classList.add('card__input_not-value');
      }
    }
  }

  if (not_check) {
    e.preventDefault();
    alert('Не все поля заполнены!');
    return;
  }
});