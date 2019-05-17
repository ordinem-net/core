"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _classPrivateFieldLooseBase(e,t){if(!Object.prototype.hasOwnProperty.call(e,t))throw new TypeError("attempted to use private field on non-instance");return e}var id=0;function _classPrivateFieldLooseKey(e){return"__private_"+id+++"_"+e}var DragAndDrop=function e(t,a,r){var s=this;_classCallCheck(this,e),this.state={el:void 0,form:void 0,action:!1,message:""},Object.defineProperty(this,_createForm,{writable:!0,value:function(e,t){var a=document.createElement("div");a.classList="drag-and-drop-form",a.innerHTML='\n\t\t\t\t<input type="file" name="'.concat(e,'" id="drAndDrp').concat(e,'" class="js-dragAndDrop" multiple />\n    \t\t\t<label class="drag-and-drop__label" for="drAndDrp').concat(e,'">').concat(t,"</label>\n\t\t\t"),a.addEventListener("change",_classPrivateFieldLooseBase(s,_changeFormForActionInp)[_changeFormForActionInp],!1);var r=a.querySelector("label");return r.addEventListener("mouseover",_classPrivateFieldLooseBase(s,_showRemoveFiles)[_showRemoveFiles],!1),r.addEventListener("mouseout",_classPrivateFieldLooseBase(s,_unshowRemoveFiles)[_unshowRemoveFiles],!1),r.addEventListener("click",_classPrivateFieldLooseBase(s,_removeFiles)[_removeFiles],!1),a}}),Object.defineProperty(this,_createEvents,{writable:!0,value:function(){var e=s.state.el;["dragenter","dragover","dragleave","drop"].forEach(function(t){e.addEventListener(t,_classPrivateFieldLooseBase(s,_preventDefaults)[_preventDefaults],!1)}),["dragenter","dragover"].forEach(function(t){e.addEventListener(t,_classPrivateFieldLooseBase(s,_highlight)[_highlight],!1)}),["dragleave","drop"].forEach(function(t){e.addEventListener(t,_classPrivateFieldLooseBase(s,_unhighlight)[_unhighlight],!1)}),e.addEventListener("drop",_classPrivateFieldLooseBase(s,_handleDrop)[_handleDrop],!1)}}),Object.defineProperty(this,_preventDefaults,{writable:!0,value:function(e){e.preventDefault(),e.stopPropagation()}}),Object.defineProperty(this,_highlight,{writable:!0,value:function(e){var t=s.state.form;t.classList.add("drag-and-drop__highlight"),t.querySelector("label").innerHTML="Отпустите файл!"}}),Object.defineProperty(this,_unhighlight,{writable:!0,value:function(e){var t=s.state,a=t.form,r=t.message;a.classList.remove("drag-and-drop__highlight"),a.querySelector("label").innerHTML=r}}),Object.defineProperty(this,_handleDrop,{writable:!0,value:function(e){var t=s.state.form,a=e.dataTransfer.files;t.querySelector('input[type="file"]').files=a,_classPrivateFieldLooseBase(s,_changeFormForActionInp)[_changeFormForActionInp]()}}),Object.defineProperty(this,_changeFormForActionInp,{writable:!0,value:function(){var e=s.state.form;s.state.action=!0,e.classList.add("drag-and-drop__action"),e.querySelector("label").innerHTML="Файл Загружен!"}}),Object.defineProperty(this,_removeFiles,{writable:!0,value:function(e){var t=s.state,a=t.action,r=t.form,o=t.message;a&&(r.classList.remove("drag-and-drop__remove"),r.classList.remove("drag-and-drop__action"),r.querySelector("label").innerHTML=o,r.querySelector('input[type="file"]').value="",s.state.action=!1,e.preventDefault())}}),Object.defineProperty(this,_showRemoveFiles,{writable:!0,value:function(){var e=s.state,t=e.action,a=e.form;t&&(a.classList.add("drag-and-drop__remove"),a.querySelector("label").innerHTML="Удалить файл")}}),Object.defineProperty(this,_unshowRemoveFiles,{writable:!0,value:function(){var e=s.state,t=e.action,a=e.form;t&&(a.classList.remove("drag-and-drop__remove"),a.querySelector("label").innerHTML="Файл Загружен!")}}),this.state.el=r,this.state.form=_classPrivateFieldLooseBase(this,_createForm)[_createForm](t,a),this.state.message=a,this.state.el.appendChild(this.state.form),_classPrivateFieldLooseBase(this,_createEvents)[_createEvents]()},_createForm=_classPrivateFieldLooseKey("createForm"),_createEvents=_classPrivateFieldLooseKey("createEvents"),_preventDefaults=_classPrivateFieldLooseKey("preventDefaults"),_highlight=_classPrivateFieldLooseKey("highlight"),_unhighlight=_classPrivateFieldLooseKey("unhighlight"),_handleDrop=_classPrivateFieldLooseKey("handleDrop"),_changeFormForActionInp=_classPrivateFieldLooseKey("changeFormForActionInp"),_removeFiles=_classPrivateFieldLooseKey("removeFiles"),_showRemoveFiles=_classPrivateFieldLooseKey("showRemoveFiles"),_unshowRemoveFiles=_classPrivateFieldLooseKey("unshowRemoveFiles");