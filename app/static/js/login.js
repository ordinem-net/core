'use strict';

var newKey = document.querySelector('#newKey');
var form = document.querySelector('#login');
var action = document.querySelector('#cardAction');
console.log(form);
newKey.addEventListener('click', function (e) {
  if (newKey.checked) {
    var result = confirm('При создании новых ключей ваш аккаунт будет не активен примерно 10 минут и вы не сможете производить какие либо дейстия. Вы уверены, что хотите создать новые ключи?');

    if (!result) {
      e.preventDefault();
    }
  }
});
action.addEventListener('click', function (e) {
  var inputs = form.querySelectorAll('input');
  var not_check = false;

  for (var i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
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