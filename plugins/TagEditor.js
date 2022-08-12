var TagEditor=function(){"use strict";var t=function(t){function e(e){t.call(this),this.app=e,this.tag=null,this.player=null,this._is_enter=!1,this._is_split=!0,this._handler=null}t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e;var i={tags:{configurable:!0}};return i.tags.get=function(){return this.app.TagManager.tags||(this.app.TagManager.tags=[]),this.app.TagManager.tags},e.prototype.enter=function(t){var e=this;this.app.TagManager.hideAll();var i=this.app.store.getValue("metadata");if(i&&"laser"===i.sceneFrom&&(this._is_split=!1),this.player=this.app.core.get("Player"),this.tag="string"==typeof t?this.tags.find((function(e){return e.sid==t})):t,this._is_enter=!0,!this.tag)return this.align();var a=this.player.model.panos.closestPanoTowardPoint({point:this.tag.position,getAll:!0}).map((function(t){return t.pano})).filter((function(t){return e.tag.visiblePanos.indexOf(t)>-1&&t.position.clone().setY(e.tag.position.y).sub(e.tag.position).length()>1.5})),n=a[0],r=a.filter((function(t){return t.floorIndex==e.player.model.currentFloor.floorIndex}));return r.length>0&&(n=r[0]),n||(n=this.player.currentPano),new Promise((function(t){e.player.flyToPano({pano:n,lookAtPoint:e.tag.position,aimDuration:0,duration:1},(function(){e.align().then((function(){e._handler.markTagPos=e.tag.position,t()}))}))}))},e.prototype.exit=function(){var t=this;if(this.app.TagManager.showAll(),this._is_split){if(!this._handler)return;this.app.core.get("Scene").restore("TAG"),this._handler.exit({cancel:!0})}else this.player.locked=!1,this.player.reticule.visible=!0,this.spot3d.visible=!1,this.updateTagPos=!1;setTimeout((function(){t.player.cameraControls.activeControl.camera.fov=70,t.player.camera.fov=t.player.baseFov*(1/t.player.zoomLevel)}),50),this.tag=null,this._is_enter=!1,this._is_split=!0},e.prototype.align=function(){var t=this;return this.app.core.get("Scene").getSplit("TAG").then((function(e){null===t._handler&&(t._handler=t.app.withNewComponent("TagEditManager",e,{spotA:t.app.dom.querySelector('.player[name="main"] .player-mark'),spotB:t.app.dom.querySelector('.player[name="copy"] .player-mark')})),t.tag?t._handler.reSetPos(t.tag.position):t._handler.enter()}))},e.prototype.confirm=function(t){if(void 0===t&&(t=!0),this._handler){var e=this.tag,i=this._handler.confirmPos(),a=i.position,n=i.sid;if(!a)return t&&this.exit(),null;var r=this.app.TagManager.getVisiblePano(a);return null==e?e={position:a,visiblePanos:r,sid:n,icon:this.app.resource.base("images/tag_icon_default.svg")}:e.position=a,e.panoId=this.player.currentPano.id,t&&this.exit(),e}},e.prototype.save=function(t,e){void 0===e&&(e=[]);var i={num:this.app.config.num,hotDataList:t,icons:e};return this.app.remote_editor.tag_save(i)},Object.defineProperties(e.prototype,i),e}(KanKan.MITT.Emiter);return function(e,i){var a=KanKan.Deferred();return e.Scene.on("loaded",(function(){var n=new t(e,i);n.$name="TagEditor",n.$load=function(){e.TagManager.install("editor",n)},a.resolve(n)})),a}}();
