var TagView=function(){"use strict";var t=function(t,e){if(!t)return 0;var i="";return document.defaultView&&document.defaultView.getComputedStyle?i=document.defaultView.getComputedStyle(t,"").getPropertyValue(e):t.currentStyle&&(e=e.replace(/\-(\w)/g,(function(t,e){return e.toUpperCase()})),i=t.currentStyle[e]),i||0},e=KanKan.Viewmode,i=function(i){function a(t,a){var n=this;i.call(this),this.app=t,this.sid="",this.rendered=!1,this.options=a||{},this.$tag=null,this.$tags={},this.player=null,this.__is_aimat=!1,this.__is_disable=!1,this.app.TagManager.on("update",(function(t){n.tags&&n.tags.length&&(n.player||(n.player=n.app.core.get("Player")),n.__is_disable=n.app.Camera.mode!==e.PANORAMA,n.tags.forEach((function(t){t&&n.$tags[t.sid]&&(t.visible?(n.$tags[t.sid].style.transform="translate("+t.x+"px,"+t.y+"px)",n.$tags[t.sid].style.display="block"):n.$tags[t.sid].style.display="none")})),n.__is_disable||("level3"==t.lastFrameChanged?n.waitToAimAtTag(!1):n.waitToAimAtTag(!0)))}))}i&&(a.__proto__=i),a.prototype=Object.create(i&&i.prototype),a.prototype.constructor=a;var n={tags:{configurable:!0},isAimating:{configurable:!0}};return n.tags.get=function(){return this.app.TagManager.tags||[]},n.tags.set=function(t){var e=this;this.TagManager.tags||(this.TagManager.tags=[]),t&&t.length&&t.forEach((function(t){e.TagManager.tags.push(t)}))},n.isAimating.get=function(){return this.__is_aimat},a.prototype.remove=function(t){var e=document.querySelector("[xui_tags_view]"),i=e.querySelector('[data-tag-id="'+t+'"]');e.removeChild(i)},a.prototype.removeAll=function(){document.querySelector("[xui_tags_view]").innerHTML=""},a.prototype.bind=function(t){var e=this,i=[],a=this.options.render||function(){},n=document.querySelector("[xui_tags_view]");if(this.$tags=this.$tags||{},t.forEach((function(t){if(!n.querySelector('[data-tag-id="'+t.sid+'"]')){t.icon?0!==t.icon.indexOf("http")&&(t.icon=e.app.resource.getUserResourceURL(t.icon)):t.icon=e.app.resource.base("images/tag_icon_default.svg");var r=a(t)||'<span class="tag-icon animate" style="background-image:url({{icon}})"></span>';"string"==typeof r?i.push('\n                    <div data-tag-unbind data-tag-id="'+t.sid+'" data-tag-type="'+t.type+'">\n                        '+r.replace(/\{\{(\w+)\}\}/g,(function(e,i){return t[i]}))+"\n                    </div>"):r instanceof HTMLElement&&(r.setAttribute("data-tag-id",t.sid),r.setAttribute("data-tag-type",t.type),r.setAttribute("data-tag-unbind",!0),n.insertAdjacentElement("beforeend",r))}})),i.length){var r=document.createElement("template");r.innerHTML=i.join(""),n.appendChild(r.content)}n.querySelectorAll("[data-tag-unbind]").forEach((function(t){t.removeAttribute("data-tag-unbind");var i=t.getAttribute("data-tag-id");i&&(e.$tags[i]=t),t.addEventListener("mouseenter",(function(t){e.__is_disable||(t.preventDefault(),t.stopPropagation(),e.$tags[i].classList.add("active"),t.data=e.tags.find((function(t){return t.sid==i})),t.$tag=e.$tags[i],e.sid&&e.sid!=i&&(e.$tags[e.sid].classList.remove("fixed"),e.sid="",e.$tag=null),e.emit("mouseenter",t))})),t.addEventListener("mouseleave",(function(t){e.__is_disable||(t.preventDefault(),t.stopPropagation(),Object.keys(e.$tags).forEach((function(t){e.$tags[t].classList.remove("active")})),t.data=e.tags.find((function(t){return t.sid==i})),t.$tag=e.$tags[i],e.emit("mouseleave",t))})),t.addEventListener("click",(function(t){if(e.__is_disable)e.focus(i);else{t.preventDefault(),t.stopPropagation();var a=document.querySelector("[xui_tags_view] >div.fixed");a&&a.classList.remove("fixed"),e.$tags[i].classList.add("fixed"),e.sid=i,t.data=e.tags.find((function(t){return t.sid==i})),t.$tag=e.$tag=e.$tags[i],e.emit("click",t)}}))}))},a.prototype.render=function(){var t=this;if(!this.rendered){var e=[];this.tags.forEach((function(i){t.$tags[i.sid]||e.push(i)})),this.emit("loaded",{tags:this.tags}),this.bind(e),this.emit("rendered",{tags:this.tags,elem:document.querySelector("[xui_tags_view]")}),this.rendered=!0}},a.prototype.refresh=function(){var t=this,e=[];this.tags.forEach((function(i){t.$tags[i.sid]||e.push(i)})),this.bind(e)},a.prototype.focus=function(e,i){var a=this;return new Promise((function(n){var r=a.tags.find((function(t){return t.sid==e}));if(!r)return n();var o=a.player||a.app.core.get("Player"),s=o.model.panos.closestPanoTowardPoint({point:r.position,getAll:!0}).map((function(t){return t.pano})).filter((function(t){return r.visiblePanos.indexOf(t)>-1&&t.position.clone().setY(r.position.y).sub(r.position).length()>1.5})),c=s[0],u=s.filter((function(t){return t.floorIndex==o.model.currentFloor.floorIndex}));u.length>0&&(c=u[0]),c||(console.warn("该热点无可视点位"),c=o.currentPano);var g=a.$tags[e];if(Object.keys(a.$tags).forEach((function(t){a.$tags[t].classList.remove("active")})),g.classList.add("active"),a.__is_aimat=!0,i){var d=g.querySelector(".tag-body")||{},l={width:(d.clientWidth||0)+parseInt(t(d,"margin-left"))+parseInt(t(d,"margin-right")),height:(d.clientHeight||0)+parseInt(t(d,"margin-top"))+parseInt(t(d,"margin-bottom"))},p=new THREE.Vector3,f=function(){r.x=a.app.TagManager.convertPositionTo2D(r.position).pos.x,r.y=a.app.TagManager.convertPositionTo2D(r.position).pos.y,p.set(0,0,0);var t=r.x-("left"==i?l.width/2:0),e=r.y-("top"==i?l.height/2:0);a.app.TagManager.convertScreenPositionToNDC(t,e,p,a.app.dom),p.unproject(o.camera)};if(c.id==o.currentPano.id&&"panorama"==o.mode){f();var m=new THREE.Vector3(0,0,1).applyQuaternion(o.camera.quaternion).normalize(),h=o.camera.position.clone().sub(r.position).normalize();if(m.dot(h)<0){var v=o.camera.position.clone().sub(p).multiplyScalar(-1);p=o.camera.position.clone().sub(v)}var _=r.x;o.flyToPano({pano:c,lookAtPoint:p},(function(){_>window.innerWidth/4&&_<window.innerWidth/4*3?(n(g),a.__is_aimat=!1):(f(),a.app.Camera.flyToPoint(p,{aimDur:400}),n(g),a.__is_aimat=!1)}))}else o.flyToPano({pano:c,lookAtPoint:r.position,duration:1e3},(function(){return setTimeout((function(){f(),a.app.Camera.flyToPoint(p,{aimDur:500}),n(g),a.__is_aimat=!1}),10)}))}else o.flyToPano({pano:c,lookAtPoint:r.position},(function(){n(g),a.__is_aimat=!1}))}))},a.prototype.aimAtTag=function(){var t=this,e=this.player.getDirection(),i=1/0,a=null;for(var n in this.tags){var r=this.tags[n],o=r.position.clone().sub(this.player.position).angleTo(e);o<i&&(i=o,a=r)}if(a){if(this.activeTag&&this.activeTag==a)return;this.activeTag=a,Object.keys(this.$tags).forEach((function(e){t.$tags[e].classList.remove("focus")}));var s=this.$tags[this.activeTag.sid];s.classList.add("focus"),this.emit("focus",{data:this.activeTag,target:s})}},a.prototype.waitToAimAtTag=function(t){var e=this;t?this.aimAtTagTimer||(this.aimAtTagTimer=setTimeout((function(){e.aimAtTag()}),200)):this.aimAtTagTimer&&(clearTimeout(this.aimAtTagTimer),this.aimAtTagTimer=null)},Object.defineProperties(a.prototype,n),a}(KanKan.MITT.Emiter);return function(t,e){var a=KanKan.Deferred();return t.Scene.on("loaded",(function(){var n=new i(t,e);n.$name="TagView",n.$html="<div xui_tags_view></div> <style> [xui_tags_view] {\r\n        position: absolute;\r\n        width: 100%;\r\n        height: 100%;\r\n    }\r\n    [xui_tags_view] > div {\r\n        pointer-events: all;\r\n        display: none;\r\n        position: absolute;\r\n        width: 48px;\r\n        height: 48px;\r\n        margin-left: -24px;\r\n        margin-top: -24px;\r\n        z-index: 1;\r\n    }\r\n\r\n    [xui_tags_view] > div.focus {\r\n        z-index: 2;\r\n    }\r\n    [xui_tags_view] > div.fixed {\r\n        z-index: 3;\r\n    }\r\n    [xui_tags_view] > div.active {\r\n        z-index: 4;\r\n    }\r\n\r\n    [xui_tags_view] .tag-icon {\r\n        display: block;\r\n        width: 48px;\r\n        height: 48px;\r\n        background-size: cover;\r\n        cursor: pointer;\r\n    }\r\n\r\n    [xui_tags_view] .tag-icon.animate {\r\n        animation: tag-animate-zoom 3s -1s linear infinite;\r\n    }\r\n\r\n    @keyframes tag-animate-zoom {\r\n        0% {\r\n            transform: scale(1);\r\n        }\r\n        50% {\r\n            transform: scale(0.7);\r\n        }\r\n        100% {\r\n            transform: scale(1);\r\n        }\r\n    } </style> ",n.$load=function(){t.TagManager.install("view",n)},a.resolve(n)})),a}}();
