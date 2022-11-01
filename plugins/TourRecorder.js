var TourRecorder=function(){"use strict";var e=KanKan.Animate.transitions,t="floorplan",r={flydown:{movementEasing:"easeInOutQuad",movementDelay:.001,rotationEasing:"easeInOutQuad",rotationDelay:.5,modelTextureDelay:.75,skyboxDelay:.75}};r.freeze=Object.freeze({FlyToPano:e.getUniqueId(),FlyToNewMode:e.getUniqueId(),FlyToSameMode:e.getUniqueId(),FlyToViewFloor:e.getUniqueId(),LookTransition:e.getUniqueId(),ZoomTransition:e.getUniqueId(),LookRotationForPlay:e.getUniqueId(),wallLineShine:e.getUniqueId(),spotShine:e.getUniqueId(),rulerShine:e.getUniqueId(),outsideFocus:e.getUniqueId(),shopCircle:e.getUniqueId()});var a=function(a){function o(e){var t=this;a.call(this),this.app=e,this.player=e.core.get("Player"),this._change=function(){t.emit("change",t.tours)},this._checkLastFrame=function(){if(t.tours.length)if(1==t.tours.length){var e=t.tours[0].list;if(e&&e.length){var r=null;e.forEach((function(e){delete e._end,delete e._notrans,null==r||"panorama"==r.enter.mode&&"panorama"==e.enter.mode&&r.enter.panoId!=e.enter.panoId||(r._notrans=!0),r=e})),e.length>0&&(e[e.length-1]._end=!0)}}else for(var a=!1,o=(r=null,t.tours.length-1);o>=0;o--)t.tours[o].list.forEach((function(e,t){delete e._end,delete e._notrans,null==r||"panorama"==r.enter.mode&&"panorama"==e.enter.mode&&r.enter.panoId!=e.enter.panoId||(r._notrans=!0),r=e})),t.tours[o].list.length>0&&(a||(a=!0,t.tours[o].list[t.tours[o].list.length-1]._end=!0))}}a&&(o.__proto__=a),o.prototype=Object.create(a&&a.prototype),o.prototype.constructor=o;var n={tours:{configurable:!0},partId:{configurable:!0},frameId:{configurable:!0},playing:{configurable:!0}};return n.tours.get=function(){return this.app.TourManager.tours},n.partId.get=function(){return this.app.TourManager.partId},n.partId.set=function(e){this.app.TourManager.partId=e},n.frameId.get=function(){return this.app.TourManager.frameId},n.frameId.set=function(e){this.app.TourManager.frameId=e},n.playing.get=function(){return this.app.TourManager.playing},o.prototype.clear=function(){this.partId=0,this.frameId=0,this.app.TourManager.playing=!1,this.app.TourManager.tours.length=[],this.emit("change",{type:"clear",data:this.tours})},o.prototype.getPart=function(){return this.tours[this.partId]},o.prototype.addPart=function(e){var t={sid:this.app.TourManager.uuid(),name:e||"",list:[],music:"",musicName:""};0===this.tours.length||this.tours.length-1==this.partId?(this.tours.push(t),this.partId=this.tours.length-1):(this.tours.splice(this.partId+1,0,t),this.partId++),this._checkLastFrame(),this.emit("change",{action:"add",type:"part",data:this.tours[this.partId]})},o.prototype.setPart=function(e,t){void 0===t&&(t={});var r=this.tours[e];if(r){for(var a in t)r.hasOwnProperty(a)&&(r[a]=t[a],"music"==a&&this.app.TourManager.audioPlayer.add(r));this.emit("change",{action:"update",type:"part",data:r})}},o.prototype.selectPart=function(e){var t=this;return new Promise((function(r){if(isNaN(e))return r();var a=t.tours[e];a?(t.partId=e,t.frameId=0,t.app.TourManager.player.then((function(e){e.selectPart(t.partId).then((function(){return r(a)}))}))):r()}))},o.prototype.deletePart=function(e){if(isNaN(e)||!this.tours.length)return Promise.resolve();this.tours[e+1]&&this.tours[e]||(this.partId=0);var t=this.tours.splice(e,1);return t?(this._checkLastFrame(),this.emit("change",{action:"delete",type:"part",data:t}),this.selectPart(this.partId)):Promise.resolve()},o.prototype.setPartCover=function(e){if(!isNaN(e)){var t=this.tours[this.partId];-1==e&&delete t.frameId,t&&t.list[e]&&(t.frameId=e),this.emit("change",{action:"update",type:"part",data:t})}},o.prototype.getFrame=function(){var e=this.tours[this.partId];if(e)return e.list[this.frameId]},o.prototype.addFrame=function(){var e=this;return this.app.Camera.screenshot([{width:360,height:240,name:"200"}],!1).then((function(t){var r={sid:e.app.TourManager.uuid(),enter:{mode:e.player.mode,panoId:(e.player.currentPano||{id:null}).id,qua:e.parseJSONForQua(e.player.quaternion),pos:JSON.parse(JSON.stringify(e.player.position)),target:{x:e.player.cameraControls.activeControl.target.x,y:e.player.cameraControls.activeControl.target.y,z:e.player.cameraControls.activeControl.target.z},currentScale:"panorama"!=e.player.mode?e.player.cameraControls.activeControl.currentScale:null,cover:t[0].data,floor:null==e.player.model.currentFloorId?e.player.model.currentFloor.floorIndex:e.player.model.currentFloorId},exit:{},time:3e3,rotateRange:35,rotateType:"L",transitType:"normal"};if(e.tours.length){var a=e.tours[e.partId].list;0==a.length||a.length-1==e.frameId?(a.push(r),e.frameId=a.length-1):(a.splice(e.frameId+1,0,r),e.frameId++)}else e.tours.push({sid:e.app.TourManager.uuid(),name:"",list:[r],music:"",musicName:""}),e.partId=0,e.frameId=0,e.emit("change",{action:"add",type:"part",data:e.tours[e.tours.length-1]});e._checkLastFrame(),e.emit("change",{action:"add",type:"frame",data:r})}))},o.prototype.setFrame=function(e,t){var r=this.tours[this.partId].list[e];r&&Object.assign(r,t),this.emit("change",{action:"update",type:"frame",data:r})},o.prototype.setFrames=function(e){this.tours.forEach((function(t){t.list.forEach((function(t){Object.assign(t,e)}))})),this.emit("change",{action:"update",type:"frames"})},o.prototype.setEnter=function(e){var t=this;null!=e&&(this.frameId=e);var r=this.tours[this.partId].list[this.frameId];return r?r.enter.mode!=this.player.mode?Promise.reject({errType:2,errMsg:"模式不一致"}):r.enter.panoId&&r.enter.panoId!=this.player.currentPano.id?Promise.reject({errType:2,errMsg:"点位不一致"}):this.app.Camera.screenshot([{width:360,height:240,name:"200"}],!1).then((function(e){return r.enter={mode:t.player.mode,panoId:(t.player.currentPano||{id:null}).id,qua:JSON.parse(JSON.stringify(t.player.quaternion)),pos:JSON.parse(JSON.stringify(t.player.position)),currentScale:"panorama"!=t.player.mode?t.player.cameraControls.activeControl.currentScale:null,cover:e[0].data},t.emit("change",{action:"update",type:"frame",data:r}),r})):Promise.reject({errType:1,errMsg:"数据不存在"})},o.prototype.setExit=function(e){var t=this;null!=e&&(this.frameId=e);var r=this.tours[this.partId].list[this.frameId];return r?r.enter.mode!=this.player.mode?Promise.reject({errType:2,errMsg:"模式不一致"}):r.enter.panoId&&r.enter.panoId!=this.player.currentPano.id?Promise.reject({errType:2,errMsg:"点位不一致"}):this.app.Camera.screenshot([{width:360,height:240,name:"200"}],!1).then((function(e){return t.player.getSize(),r.exit={mode:t.player.mode,panoId:(t.player.currentPano||{id:null}).id,qua:t.parseJSONForQua(t.player.quaternion),pos:JSON.parse(JSON.stringify(t.player.position)),currentScale:"panorama"!=t.player.mode?t.player.cameraControls.activeControl.currentScale:null,cover:e[0].data},t.emit("change",{action:"update",type:"frame",data:r}),r})):Promise.reject({errType:1,errMsg:"数据不存在"})},o.prototype.selectFrame=function(e){var t=this;return new Promise((function(r){if(isNaN(e))return r();t.tours[t.partId].list[e]?(t.frameId=e,t.app.TourManager.player.then((function(e){e.selectFrame(t.frameId).then((function(e){return r(e)}))}))):r()}))},o.prototype.playForRotateForDollAndFloor=function(a,o,n,i,s,u,l){var p=this.app.core.get("Player");e.start(KanKan.Animate.lerp.vector(p.cameraControls.activeControl.target,new THREE.Vector3(o.x,o.y,o.z),s),l,null,0,KanKan.Animate.easing[r.flydown.rotationEasing],null,r.freeze.LookRotationForPlay),e.start(KanKan.Animate.lerp.vector(p.cameraControls.activeControl.camera.position,a),l,u,0,KanKan.Animate.easing[r.flydown.rotationEasing],null,r.freeze.LookRotationForPlay),i==t&&p.cameraControls.activeControl.absoluteScale!=n&&e.start(KanKan.Animate.lerp.property(p.cameraControls.activeControl,"absoluteScale",n,function(e){p.cameraControls.activeControl&&(p.cameraControls.activeControl.currentScale=e,"PerspectiveCamera"!=p.cameraControls.activeControl.camera.type&&p.cameraControls.activeControl.updateZoom())}.bind(this)),l,null,0,KanKan.Animate.easing[r.flydown.rotationEasing],null,r.freeze.LookRotationForPlay)},o.prototype.deleteFrame=function(e){if(isNaN(e))return Promise.resolve();var t,r=this.tours[this.partId],a=r.list;if(!a||!a.length||!a[e])return Promise.resolve();a[e+1]||(this.frameId=0),r.frameId&&(t=a[r.frameId].sid);var o=a.splice(e,1);return r.frameId==e?delete r.frameId:r.frameId&&a.forEach((function(e,a){t==e.sid&&(r.frameId=a)})),a.length?(this._checkLastFrame(),this.emit("change",{action:"delete",type:"frame",data:o}),this.selectFrame(this.frameId)):(this.frameId=0,this.deletePart(this.partId))},o.prototype.exportFiles=function(){var e=[];return this.tours.forEach((function(t,r){t.music&&0===t.music.indexOf("blob:")&&!t._uploaded&&e.push({name:t.musicName.replace(/(.+)\.(.+)/,"tour-audio-"+t.sid+".$2"),type:"file"}),t.list.forEach((function(t,r){t.enter&&t.enter.cover&&0===t.enter.cover.indexOf("data:image")&&!t.enter._uploaded&&e.push({name:"tour-enter-"+t.sid+".jpg",file:t.enter.cover,type:"base64"}),t.exit&&t.exit.cover&&0===t.exit.cover.indexOf("data:image")&&!t.exit._uploaded&&e.push({name:"tour-exit-"+t.sid+".jpg",file:t.exit.cover,type:"base64"})}))})),e},o.prototype.exportData=function(){for(var e=JSON.parse(JSON.stringify(this.tours,(function(e,t){return"audio"===e?null:t}))),t=e.length-1;t>=0;t--){var r=e[t];r.list&&r.list.length?(delete r.audio,delete r._uploaded,r.music&&0===r.music.indexOf("blob:")&&(r.music=r.musicName.replace(/(.+)\.(.+)/,"tour-audio-"+r.sid+".$2")),r.list.forEach((function(e,t){delete e._notrans,delete e.enter._uploaded,delete e.exit._uploaded,e.enter&&e.enter.cover&&0===e.enter.cover.indexOf("data:image")&&(e.enter.cover="tour-enter-"+e.sid+".jpg"),e.exit&&e.exit.cover&&0===e.exit.cover.indexOf("data:image")&&(e.exit.cover="tour-exit-"+e.sid+".jpg")}))):e.splice(t,1)}return e},o.prototype.restoreFiles=function(){this.tours.forEach((function(e){delete e._uploaded,e.list.forEach((function(e){delete e.enter._uploaded,delete e.exit._uploaded}))}))},o.prototype.parseJSONForQua=function(e){return e.hasOwnProperty("x")?{x:e.x,y:e.y,z:e.z,w:e.w}:e.hasOwnProperty("_x")?{x:e._x,y:e._y,z:e._z,w:e._w}:{}},o.prototype.parseVector4=function(e){return new THREE.Quaternion(e.x,e.y,e.z,e.w)},o.prototype.parseVector3=function(e){return new THREE.Vector3(e.x,e.y,e.z)},Object.defineProperties(o.prototype,n),o}(KanKan.MITT.Emiter);return function(e,t){void 0===t&&(t={});var r=KanKan.Deferred();return e.Scene.on("loaded",(function(){var o=new a(e,t);o.$name="TourRecorder",o.$load=function(){e.TourManager.install("recorder",o)},r.resolve(o)})),r}}();
