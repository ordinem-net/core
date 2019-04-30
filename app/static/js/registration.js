"use strict";

var form = document.querySelector('#registration');
var action = document.querySelector('#cardAction');
action.addEventListener('click', function (e) {
  var inputs = form.querySelectorAll('input');
  var not_check = false;

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].required && !inputs[i].value) {
      not_check = true;
      inputs[i].classList.add('card__input_not-value');
    }
  }

  if (not_check) {
    e.preventDefault();
    alert('Не все поля заполнены!');
    return;
  }
});