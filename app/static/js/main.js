"use strict";

var HTMLSpechialChar = {
  '&#39;': '\"',
  '&lt;': '\<',
  '&gt;': '\>',
  '&guot;': '\"',
  '&#x2F;': '\/',
  'nbsp;': ' ',
  '&amp;': ''
};

function fixJsObj(str) {
  var fix_obj_str = str;
  console.log(str);

  for (var el in HTMLSpechialChar) {
    fix_obj_str = fix_obj_str.replace(new RegExp(el, 'g'), HTMLSpechialChar[el]);
  }

  return JSON.parse(fix_obj_str);
}