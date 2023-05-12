var MinMap=function(){"use strict";var t=function(){};t.prototype.getFixed=function(t,e){return e||(e=5),parseFloat(t.toFixed(e))},t.prototype.createLine1=function(t,e){if(t.x==e.x&&t.y==e.y)return null;if(0==this.getFixed(Math.abs(t.x-e.x)))return{x:t.x};if(0==this.getFixed(Math.abs(t.y-e.y)))return{y:t.y};var i=(t.y-e.y)/(t.x-e.x),n=(t.x*e.y-e.x*t.y)/(t.x-e.x);return 0==this.getFixed(i)?{y:this.getFixed(n)}:{a:this.getFixed(i),b:this.getFixed(n)}},t.prototype.createLine2=function(t,e){if(e==Math.PI/2||e==1.5*Math.PI)return{x:t.x};var i=Math.tan(e),n=t.y-i*t.x;return 0!=i?{a:i,b:n}:{y:t.y}},t.prototype.createLine3=function(t,e){var i={};return void 0===t.a?void 0!==t.x?i.x=e.x:void 0!==t.y&&(i.y=e.y):(i.a=t.a,i.b=e.y-e.x*t.a),i},t.prototype.create2AngleLine=function(t,e,i){return{line1:this.createLine2(t,e-i/2),line2:this.createLine2(t,e+i/2)}},t.prototype.distanceForPoints=function(t,e){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))},t.prototype.getParallelLineForDistance=function(t,e){var i={};i.a=t.a,i.b=t.b;var n={};if(n.a=t.a,n.b=t.b,void 0===t.a){if(t.hasOwnProperty("x")){var o=t.x;i.x=o+e,n.x=o-e}else if(t.hasOwnProperty("y")){var s=t.y;i.y=s+e,n.y=s-e}}else{var r=Math.atan(t.a),a=Math.abs(e/Math.cos(r)),h=t.b;i.b=h+a,n.b=h-a}return{line1:i,line2:n}},t.prototype.getEndpoint=function(t,e,i){var n=this.create2AngleLine(t,e,i),o=this.createLine2(t,e);o=this.getLineForPoint(o,t);var s=this.getParallelLineForDistance(o,15),r=this.getIntersectionPoint(n.line1,s.line1),a=this.getIntersectionPoint(n.line1,s.line2),h=this.getIntersectionPoint(n.line2,s.line1),l=this.getIntersectionPoint(n.line2,s.line2),c=this.Angle(t,r,{x:t.x+1,y:t.y}),x=this.Angle(t,a,{x:t.x+1,y:t.y}),p=this.Angle(t,h,{x:t.x+1,y:t.y}),y=this.Angle(t,l,{x:t.x+1,y:t.y});return e>Math.PI&&(e=2*Math.PI-e),Math.abs((c+p)/2-e)<Math.abs((x+y)/2-e)?{p1:r,p2:h}:{p1:a,p2:l}},t.prototype.getIntersectionPoint=function(t,e){if(this.isParallel(t,e))return null;if(void 0===t.a&&void 0!==e.a){if(t.x)return{x:t.x,y:e.a*t.x+e.b};if(t.y)return{x:(t.y-e.b)/e.a,y:t.y}}else if(void 0===e.a&&void 0!==t.a){if(e.x)return{x:e.x,y:t.a*e.x+t.b};if(e.y)return{x:(e.y-t.b)/t.a,y:e.y}}else if(void 0===e.a&&void 0===t.a)return t.hasOwnProperty("x")&&e.hasOwnProperty("y")?{x:t.x,y:e.y}:t.hasOwnProperty("y")&&e.hasOwnProperty("x")?{x:e.x,y:t.y}:null;return t.a==e.a?null:{x:(e.b-t.b)/(t.a-e.a),y:(t.a*e.b-e.a*t.b)/(t.a-e.a)}},t.prototype.isParallel=function(t,e){var i=this.fixed;return void 0===t.a&&void 0===e.a?!(!t.hasOwnProperty("x")||!e.hasOwnProperty("x"))||!(!t.hasOwnProperty("y")||!e.hasOwnProperty("y")):void 0!==t.a&&void 0!==e.a&&t.a.toFixed(i)==e.a.toFixed(i)},t.prototype.Angle=function(t,e,i){var n,o,s=0,r=e.x-t.x,a=e.y-t.y,h=i.x-t.x,l=i.y-t.y;return s=r*h+a*l,o=(r*r+a*a)*(h*h+l*l),(s/=Math.sqrt(o))>=1?0:s<=-1?180:180*(n=Math.acos(s))/Math.PI<180?n:2*Math.PI-n},t.prototype.getLineForPoint=function(t,e){var i={};return 0==t.a||void 0===t.a?t.hasOwnProperty("x")?i.y=e.y:t.hasOwnProperty("y")&&(i.x=e.x):(i.a=-1/t.a,i.b=e.y-e.x*i.a),i},t.prototype.createLine2=function(t,e){if(e==Math.PI/2||e==1.5*Math.PI)return{x:t.x};var i=Math.tan(e),n=t.y-i*t.x;return 0!=i?{a:i,b:n}:{y:t.y}},t.prototype.getDistance=function(t,e){var i=t.x,n=t.y,o=e.x,s=e.y,r=Math.sqrt(Math.pow(i-o,2)+Math.pow(n-s,2));return this.getFixed(r)},t.prototype.isClockwise=function(t){for(var e=0,i=0;i<t.length;i++){var n=(i+1)%t.length;e+=t[i].x*t[n].y,e-=t[n].x*t[i].y}return e/2>0},t.prototype.getVerticalLine=function(t,e){if(void 0===t.a)return t.hasOwnProperty("x")?{y:e.y}:t.hasOwnProperty("y")?{x:e.x}:null;if(0==t.a)return{x:e.x};var i={};return i.a=-1/t.a,this.createLine3(i,e)};var e=new t,i={strokeStyle:"#FFFFFF",lineWidth:2,lineWidth_out:4,important:{strokeStyle:"#FFFFFF",lineWidth:4},error:{strokeStyle:"rgba(255,0,0,0.5)",fillStyle:"rgba(255,0,0,0.8)"}},n={strokeStyle:"rgba(255,255,255,1)",fillStyle:"rgba(255,255,255,0)",lineWidth:1,Pass:{}},o={strokeStyle:"rgba(255,255,255,1)",fillStyle:"rgba(255,255,255,0)",lineWidth:1},s="SingleDoor",r="DoubleDoor",a="SlideDoor",h="SingleWindow",l="BayWindow",c="FrenchWindow",x="Pass",p="Beam",y="Flue",u="Corridor",d=20,g=20,v=20,P=20,f={cameraR:2,camera_fillStyle:"#1FE4DC",camera_strokeStyle:"white",cameraSectorR:18,cameraSector_fillStyle:["rgba(31,228,220, 1)","rgba(31,228,220, 0)"],cameraSectorAngle:70/180*Math.PI},m=function(t,e){if((t=t.toLowerCase())&&/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t)){if(4===t.length){for(var i="#",n=1;n<4;n+=1)i+=t.slice(n,n+1).concat(t.slice(n,n+1));t=i}var o=[];for(n=1;n<7;n+=2)o.push(parseInt("0x"+t.slice(n,n+2)));return void 0===e?"rgb("+o.join(",")+")":"rgba("+o.join(",")+","+(void 0===e?1:e)+")"}return t},b=function(t,e,i){var n=this;this.app=t,this.dom=e,this.mode=null,this.ready=!1,this.$minmap=null,i.theme&&this.theme(i.theme),window.addEventListener("resize",(function(){n.render()})),this.app.core.get("Player").on("mode.changing",(function(t,e,i){n.mode=e,"panorama"===e?!1!==n.app.MinMap.display&&!0!==n.app.MinMap.hidden&&(n.show(),n.render(i.floorIndex)):n.hide()})),this.angle=0};return b.prototype.init=function(){this.canvas1=null,this.canvas2=null,this.canvas3=null,this.context1=null,this.context2=null,this.ratio=null,this.resolution=null,this.playerPoint=null,this.playerAngle=null,this.canvas_bounding=null,this.cad_bounding=null,this.$minmap=this.dom.querySelector("[xui_min_map]"),this.initContext(),this.data()},b.prototype.data=function(t){var e=this;return this.app.store.get("flooruser",t).then((function(i){e.floor=JSON.parse(JSON.stringify(i)),e.setCadBounding(),e.render(e.app.core.get("Player").currentPano.floorIndex,t)}))},b.prototype.show=function(){"panorama"!=this.mode&&"panorama"!=this.app.Camera.mode||(this.mode=null,this.$minmap&&(this.$minmap.style.visibility="visible"))},b.prototype.hide=function(){this.$minmap&&(this.$minmap.style.visibility="hidden")},b.prototype.theme=function(t){void 0===t&&(t={}),t.camera_fillStyle&&!t.cameraSector_fillStyle&&(t.cameraSector_fillStyle=[m(t.camera_fillStyle,1),m(t.camera_fillStyle,0)]),Object.assign(f,t)},b.prototype.getFloorNumFromSubgroup=function(t,e){for(var i=0;i<t.floors.length;++i){var n=t.floors[i];if(!n.hasOwnProperty("subgroup")||n.subgroup==e)return i}},b.prototype.render=function(t,e){var i=this;if(this.floor){this.angle=0,null!=t?(this.subgroup=t,this.floorNum=this.getFloorNumFromSubgroup(this.floor,t)):this.floorNum=null==this.floorNum?0:this.floorNum;var n=this.app.store.getValue("metadata");if(this.initMapping(),this.angle=n.floorPlanAngle,"image"===this.floor.type){this.clear();var o=this.floor.floors.find((function(t){return t.subgroup==i.floorNum}));this.app.store.getUserImage(o.filename,e).then((function(t){i.initMappingForImg(t.width,t.height),i.drawCadImg(t,i.angle,i.imgRes,o.opacity/100),i.player&&i.player.camera&&i.drawPlayer({x:i.player.camera.position.x,y:i.player.camera.position.z},i.player.cameraControls.controls.panorama.lon/180*Math.PI)}))}else this.drawCad(this.floor.floors[this.floorNum]);this.$xui.show=!0,0==this.ready&&(this.ready=!0,this.bindEvent()),this.player&&this.player.camera&&this.drawPlayer({x:this.player.camera.position.x,y:this.player.camera.position.z},this.player.cameraControls.controls.panorama.lon/180*Math.PI)}},b.prototype.setCadBounding=function(){for(var t=null,e=null,i=null,n=null,o=0;o<this.floor.floors.length;++o)if(this.floor.floors[o].points)for(var s in this.floor.floors[o].points)(null==t||t>this.floor.floors[o].points[s].x)&&(t=this.floor.floors[o].points[s].x),(null==e||e>this.floor.floors[o].points[s].y)&&(e=this.floor.floors[o].points[s].y),(null==i||i<this.floor.floors[o].points[s].x)&&(i=this.floor.floors[o].points[s].x),(null==n||n<this.floor.floors[o].points[s].y)&&(n=this.floor.floors[o].points[s].y);this.cad_bounding=this.Bounds(t,e,i,n)},b.prototype.drawPlayer=function(t,i){if((i+=this.angle)<0||i>2*Math.PI){var n=i/(2*Math.PI);(i-=Math.floor(n)*(2*Math.PI))<0&&(i+=2*Math.PI)}if(null==this.playerPoint||this.playerPoint.x!=t.x||this.playerPoint.y!=t.y||null==this.playerAngle||this.playerAngle!=i){this.clearCanvas(),this.playerPoint=t,t=this.getVectorForRotate(t),t=this.getScreenXY(t);var o=e.getEndpoint(t,i,f.cameraSectorAngle);this.drawSector(t,o.p1,o.p2,e.distanceForPoints(t,o.p1)),this.playerAngle=i,this.drawPoint(t),this.drawCircle(t)}},b.prototype.initContext=function(){this.canvas1=this.dom.querySelector("canvas[xui_min_map_cad]"),this.canvas2=this.dom.querySelector("canvas[xui_min_map_dir]"),this.canvas3=this.dom.querySelector("canvas[xui_min_map_img]"),this.context1=this.canvas1.getContext("2d"),this.context2=this.canvas2.getContext("2d"),this.initRatio(),this.canvas1.width=this.canvas1.clientWidth*this.ratio,this.canvas1.height=this.canvas1.clientHeight*this.ratio,this.canvas2.width=this.canvas2.clientWidth*this.ratio,this.canvas2.height=this.canvas2.clientHeight*this.ratio,this.context1.scale(this.ratio,this.ratio),this.context2.scale(this.ratio,this.ratio),this.canvas_bounding=this.Bounds(-this.canvas1.width/2+v,-this.canvas1.height/2+d,this.canvas1.width/2-P,this.canvas1.height/2-g)},b.prototype.bindEvent=function(){var t=this;this.$minmap.addEventListener("click",(function(){if(t.app.store.getValue("metadata").controls.showFloorplan){if(t.app.Camera.locked)return;t.app.Camera.floorplan()}})),this.player||(this.player=this.app.core.get("Player")),this.player.on("update",(function(e){var i=e.x,n=e.y,o=e.lon;if(e.hasChanged,t.player.cameraControls.activeControl&&!t.player.cameraControls.activeControl.updateForCad){if(!t.floor||!1===t.app.MinMap.display)return;t.drawPlayer({x:i,y:-1*n},o/180*Math.PI)}})),this.player.on("flying.ended",(function(e){var i=e.targetPano;i.floorIndex!==t.subgroup&&t.render(i.floorIndex)}))},b.prototype.initRatio=function(){this.context1.webkitBackingStorePixelRatio||this.context1.mozBackingStorePixelRatio||this.context1.msBackingStorePixelRatio||this.context1.oBackingStorePixelRatio||this.context1.backingStorePixelRatio,this.ratio=1},b.prototype.initMapping=function(){var t=Math.abs((this.canvas_bounding.right-this.canvas_bounding.left)/(this.cad_bounding.right-this.cad_bounding.left)),e=Math.abs((this.canvas_bounding.down-this.canvas_bounding.top)/(this.cad_bounding.top-this.cad_bounding.down));this.center={x:(this.cad_bounding.left+this.cad_bounding.right)/2,y:(this.cad_bounding.top+this.cad_bounding.down)/2},this.resolution=Math.min(t,e)},b.prototype.getScreenXY=function(t){var e=(t.x-this.center.x)*this.resolution-this.canvas_bounding.left+v,i=this.canvas_bounding.top-(t.y-this.center.y)*this.resolution+d;return e=.5+e<<0,i=.5+i<<0,{x:Math.floor(e),y:Math.floor(i)}},b.prototype.clear=function(){this.context1.clearRect(0,0,this.context1.canvas.width,this.context1.canvas.height)},b.prototype.drawDefaultCad=function(t){var e=null,n=null,o=null,s=null,r={};if(t&&t["vertex-xy"]){this.clear();for(var a=0;a<t["vertex-xy"].length;++a){var h=t["vertex-xy"][a];r[h.id]={x:h.x,y:h.y},(null==e||e>h.x)&&(e=h.x),(null==n||n>h.y)&&(n=h.y),(null==o||o<h.x)&&(o=h.x),(null==s||s<h.y)&&(s=h.y)}if(this.cad_bounding=this.Bounds(e,n,o,s),this.initMapping(),t.segment){this.context1.lineCap="square",this.context1.beginPath();for(var l=0;l<t.segment.length;++l){var c=t.segment[l],x=c.a,p=c.b,y=this.getScreenXY(r[x]),u=this.getScreenXY(r[p]);c.border?(this.context1.lineWidth=i.important.lineWidth,this.context1.strokeStyle=i.important.strokeStyle):c.border||c.exterior?c.exterior&&(this.context1.lineWidth=i.important.lineWidth,this.context1.strokeStyle=i.important.strokeStyle):(this.context1.lineWidth=i.lineWidth,this.context1.strokeStyle=i.strokeStyle),this.context1.moveTo(y.x,y.y),this.context1.lineTo(u.x,u.y),this.context1.stroke()}}}},b.prototype.drawCad=function(t){if(t.walls)for(var e in this.clear(),this.context1.lineCap="square",this.context1.beginPath(),t.walls)this.drawWall(t,e);if(t.symbols)for(var i in t.symbols)this.drawSymbol(t.symbols[i]);if(t.components)for(var n in t.components)this.drawComponent(t.components[n])},b.prototype.drawPoint=function(t){var e=2*Math.PI,i=t;this.context2.save(),this.context2.fillStyle=f.camera_fillStyle,this.context2.beginPath(),this.context2.moveTo(i.x,i.y),this.context2.arc(i.x,i.y,f.cameraR,0,e,!0),this.context2.closePath(),this.context2.fill(),this.context2.restore()},b.prototype.drawCircle=function(t){var e=f.cameraR+1,i=2*Math.PI,n=t;this.context2.save(),this.context2.strokeStyle=f.camera_strokeStyle,this.context2.lineWidth=2,this.context2.beginPath(),this.context2.arc(n.x,n.y,e,0,i,!0),this.context2.closePath(),this.context2.stroke(),this.context2.restore()},b.prototype.drawCircle2=function(t){var e=f.cameraR+1,i=2*Math.PI,n=this.getScreenXY(t);this.context2.save(),this.context2.strokeStyle=f.camera_strokeStyle,this.context2.lineWidth=2,this.context2.beginPath(),this.context2.arc(n.x,n.y,e,0,i,!0),this.context2.closePath(),this.context2.stroke(),this.context2.restore()},b.prototype.drawSector=function(t,i,n){this.context2.save();var o=this.context2.createRadialGradient(t.x,t.y,0,t.x,t.y,e.distanceForPoints(t,i));o.addColorStop(0,f.cameraSector_fillStyle[0]),o.addColorStop(1,f.cameraSector_fillStyle[1]);var s=t,r=i,a=n;this.context2.fillStyle=o,this.context2.beginPath(),this.context2.moveTo(s.x,s.y),this.context2.lineTo(r.x,r.y),this.context2.arcTo(r.x,r.y,a.x,a.y,f.cameraSectorR),this.context2.lineTo(a.x,a.y),this.context2.closePath(),this.context2.fill(),this.context2.restore()},b.prototype.drawWall=function(t,n){var o=t.walls[n],s=o.start,r=o.end,a=t.points[s],h=t.points[r],l=[];l.push(a);for(var c=0;c<o.children.length;++c){var x=t.symbols[o.children[c]];l.push(x.startPoint),l.push(x.endPoint)}l.push(h),l=l.sort(function(t,i){return e.getDistance(a,t)-e.getDistance(a,i)}.bind(this)),this.context1.save(),this.context1.beginPath(),this.context1.lineCap="square",o.important?(this.context1.lineWidth=i.important.lineWidth,this.context1.strokeStyle=i.important.strokeStyle):o.important||o.out?o.out&&(this.context1.lineWidth=i.important.lineWidth,this.context1.strokeStyle=i.important.strokeStyle):(this.context1.lineWidth=i.lineWidth,this.context1.strokeStyle=i.strokeStyle);for(var p=0;p<l.length-1;p+=2){var y=this.getScreenXY(l[p]),u=this.getScreenXY(l[p+1]);this.context1.moveTo(y.x,y.y),this.context1.lineTo(u.x,u.y)}this.context1.stroke(),this.context1.restore()},b.prototype.drawSymbol=function(t){switch(t.geoType){case s:this.drawSingleDoor(t);break;case r:this.drawDoubleDoor(t);break;case a:this.drawSlideDoor(t);break;case h:this.drawSingleWindow(t);break;case c:this.drawFrenchWindow(t);break;case l:this.drawBayWindow(t);break;case x:this.drawPass(t)}},b.prototype.drawComponent=function(t){switch(t.geoType){case p:this.drawBeam(t);break;case y:this.drawFlue(t);break;case u:this.drawCorridor(t)}},b.prototype.drawSingleDoor=function(t){var i=t.points2d;i||(i=this.setPoints2d(t.geoType,t.startPoint,t.endPoint,t.openSide));for(var o=[],s=0;s<i.length;++s)o[s]=this.getScreenXY({x:i[s].x,y:i[s].y});var r=e.getDistance(o[0],o[1]);this.context1.save(),this.context1.lineWidth=n.lineWidth,this.context1.lineCap="square",this.context1.strokeStyle=n.strokeStyle,this.context1.beginPath(),this.context1.moveTo(o[0].x,o[0].y),this.context1.lineTo(o[1].x,o[1].y),this.context1.arcTo(o[2].x,o[2].y,o[3].x,o[3].y,r),this.context1.closePath(),this.context1.stroke(),this.context1.restore()},b.prototype.drawDoubleDoor=function(t){var i=t.points2d;i||(i=this.setPoints2d(t.geoType,t.startPoint,t.endPoint,t.openSide));for(var o=[],s=0;s<i.length;++s)o[s]=this.getScreenXY({x:i[s].x,y:i[s].y});var r=e.getDistance(o[0],o[1]);this.context1.save(),this.context1.lineWidth=n.lineWidth,this.context1.lineCap="square",this.context1.strokeStyle=n.strokeStyle,this.context1.beginPath(),this.context1.moveTo(o[0].x,o[0].y),this.context1.lineTo(o[1].x,o[1].y),this.context1.arcTo(o[4].x,o[4].y,o[5].x,o[5].y,r),this.context1.closePath(),this.context1.stroke(),this.context1.beginPath(),this.context1.moveTo(o[2].x,o[2].y),this.context1.lineTo(o[1].x,o[1].y),this.context1.arcTo(o[4].x,o[4].y,o[3].x,o[3].y,r),this.context1.closePath(),this.context1.stroke(),this.context1.restore()},b.prototype.drawSlideDoor=function(t){var e=t.points2d;e||(e=this.setPoints2d(t.geoType,t.startPoint,t.endPoint,t.openSide));for(var i=[],o=0;o<e.length;++o)i[o]=this.getScreenXY({x:e[o].x,y:e[o].y});this.context1.save(),this.context1.lineWidth=n.lineWidth,this.context1.strokeStyle=n.strokeStyle,this.context1.beginPath(),this.context1.moveTo(i[0].x,i[0].y),this.context1.lineTo(i[1].x,i[1].y),this.context1.lineTo(i[2].x,i[2].y),this.context1.lineTo(i[3].x,i[3].y),this.context1.closePath(),this.context1.stroke(),this.context1.beginPath(),this.context1.moveTo(i[4].x,i[4].y),this.context1.lineTo(i[5].x,i[5].y),this.context1.lineTo(i[6].x,i[6].y),this.context1.lineTo(i[7].x,i[7].y),this.context1.closePath(),this.context1.stroke(),this.context1.restore()},b.prototype.drawSingleWindow=function(t){var e=t.points2d;e||(e=this.setPoints2d(t.geoType,t.startPoint,t.endPoint,t.openSide));for(var i=[],o=0;o<e.length;++o)i[o]=this.getScreenXY({x:e[o].x,y:e[o].y});this.context1.save(),this.context1.lineWidth=n.lineWidth,this.context1.strokeStyle=n.strokeStyle,this.context1.beginPath(),this.context1.moveTo(i[0].x,i[0].y),this.context1.lineTo(i[1].x,i[1].y),this.context1.stroke(),this.context1.beginPath(),this.context1.moveTo(i[2].x,i[2].y),this.context1.lineTo(i[3].x,i[3].y),this.context1.lineTo(i[4].x,i[4].y),this.context1.lineTo(i[5].x,i[5].y),this.context1.closePath(),this.context1.stroke(),this.context1.restore()},b.prototype.drawBayWindow=function(t){var e=t.points2d;e||(e=this.setPoints2d(t.geoType,t.startPoint,t.endPoint,t.openSide));for(var i=[],o=0;o<e.length;++o)i[o]=this.getScreenXY({x:e[o].x,y:e[o].y});this.context1.save(),this.context1.lineWidth=n.lineWidth,this.context1.strokeStyle=n.strokeStyle,this.context1.beginPath(),this.context1.moveTo(i[0].x,i[0].y),this.context1.lineTo(i[1].x,i[1].y),this.context1.lineTo(i[2].x,i[2].y),this.context1.lineTo(i[3].x,i[3].y),this.context1.closePath(),this.context1.stroke(),this.context1.beginPath(),this.context1.moveTo(i[5].x,i[5].y),this.context1.lineTo(i[6].x,i[6].y),this.context1.lineTo(i[7].x,i[7].y),this.context1.lineTo(i[4].x,i[4].y),this.context1.stroke(),this.context1.restore()},b.prototype.drawFrenchWindow=function(t){var e=t.points2d;e||(e=this.setPoints2d(t.geoType,t.startPoint,t.endPoint,t.openSide));for(var i=[],o=0;o<e.length;++o)i[o]=this.getScreenXY({x:e[o].x,y:e[o].y});this.context1.save(),this.context1.lineWidth=n.lineWidth,this.context1.strokeStyle=n.strokeStyle,this.context1.beginPath(),this.context1.moveTo(i[0].x,i[0].y),this.context1.lineTo(i[1].x,i[1].y),this.context1.moveTo(i[2].x,i[2].y),this.context1.lineTo(i[3].x,i[3].y),this.context1.moveTo(i[4].x,i[4].y),this.context1.lineTo(i[5].x,i[5].y),this.context1.moveTo(i[2].x,i[2].y),this.context1.lineTo(i[4].x,i[4].y),this.context1.moveTo(i[3].x,i[3].y),this.context1.lineTo(i[5].x,i[5].y),this.context1.moveTo(i[6].x,i[6].y),this.context1.lineTo(i[7].x,i[7].y),this.context1.stroke(),this.context1.restore()},b.prototype.drawEntranceDoor=function(t){this.context1.save();var i,n,o={x:(t.startPoint.x+t.endPoint.x)/2,y:(t.startPoint.y+t.endPoint.y)/2},s=e.createLine1(t.startPoint,t.endPoint),r=e.getLineForPoint(s,o),a=null,h=null;a=t.openSide!=t.enter?e.getParallelLineForDistance(s,this.enter_mini_Img.height/2/this.resolution):e.getParallelLineForDistance(s,this.enter_mini_Img.height/2/this.resolution+e.getDistance(t.startPoint,t.endPoint)),i=e.getIntersectionPoint(a.line1,r),n=e.getIntersectionPoint(a.line2,r);var l=e.Angle(t.startPoint,{x:t.startPoint.x+1,y:t.startPoint.y},t.endPoint);e.isClockwise([t.startPoint,t.endPoint,n])?h="LEFT"==t.openSide?"default"==t.enter?i:n:"default"==t.enter?n:i:e.isClockwise([t.startPoint,t.endPoint,i])&&(h="LEFT"==t.openSide?"default"==t.enter?n:i:"default"==t.enter?i:n),e.isClockwise([t.startPoint,t.endPoint,h])||(l=Math.PI+l),o=this.getScreenXY(o),h=this.getScreenXY(h),this.context1.translate(h.x,h.y),t.startPoint.y<=t.endPoint.y?this.context1.rotate(-l):this.context1.rotate(l),this.context1.drawImage(this.enter_mini_Img,-this.enter_mini_Img.width/2,-this.enter_mini_Img.height/2),this.context1.restore()},b.prototype.drawPass=function(t){for(var e=t.points2d,i=[],o=0;o<e.length;++o)i[o]=this.getScreenXY({x:e[o].x,y:e[o].y});this.context1.save(),this.context1.lineWidth=n.lineWidth,this.context1.strokeStyle=n.strokeStyle,this.context1.beginPath(),this.context1.moveTo(i[0].x,i[0].y),this.context1.lineTo(i[1].x,i[1].y),this.context1.lineTo(i[2].x,i[2].y),this.context1.lineTo(i[3].x,i[3].y),this.context1.closePath(),this.context1.stroke(),this.context1.beginPath(),this.context1.moveTo(i[4].x,i[4].y),this.context1.lineTo(i[5].x,i[5].y),this.context1.setLineDash([3,2,2]),this.context1.stroke(),this.context1.beginPath(),this.context1.moveTo(i[6].x,i[6].y),this.context1.lineTo(i[7].x,i[7].y),this.context1.setLineDash([3,2,2]),this.context1.stroke(),this.context1.restore()},b.prototype.drawBeam=function(t){for(var e=t.points2d,i=[],n=0;n<e.length;++n)i[n]=this.getScreenXY({x:e[n].x,y:e[n].y});this.context1.save(),this.context1.lineWidth=o.lineWidth,this.context1.strokeStyle=o.strokeStyle,this.context1.beginPath(),this.context1.moveTo(i[0].x,i[0].y),this.context1.lineTo(i[1].x,i[1].y),this.context1.lineTo(i[2].x,i[2].y),this.context1.lineTo(i[3].x,i[3].y),this.context1.closePath(),this.context1.stroke(),this.context1.moveTo(i[0].x,i[0].y),this.context1.lineTo(i[2].x,i[2].y),this.context1.moveTo(i[1].x,i[1].y),this.context1.lineTo(i[3].x,i[3].y),this.context1.stroke(),this.context1.restore()},b.prototype.drawFlue=function(t){for(var e=t.points2d,i=[],n=0;n<e.length;++n)i[n]=this.getScreenXY({x:e[n].x,y:e[n].y});this.context1.save(),this.context1.lineWidth=o.lineWidth,this.context1.strokeStyle=o.strokeStyle,this.context1.beginPath(),this.context1.moveTo(i[0].x,i[0].y),this.context1.lineTo(i[1].x,i[1].y),this.context1.lineTo(i[2].x,i[2].y),this.context1.lineTo(i[3].x,i[3].y),this.context1.closePath(),this.context1.beginPath(),this.context1.moveTo(i[4].x,i[4].y),this.context1.lineTo(i[5].x,i[5].y),this.context1.lineTo(i[6].x,i[6].y),this.context1.lineTo(i[7].x,i[7].y),this.context1.closePath(),this.context1.moveTo(i[4].x,i[4].y),this.context1.lineTo(i[8].x,i[8].y),this.context1.lineTo(i[6].x,i[6].y),this.context1.stroke(),this.context1.restore()},b.prototype.drawCorridor=function(t){for(var e=t.points2d,i=[],n=0;n<e.length;++n)i[n]=this.getScreenXY({x:e[n].x,y:e[n].y});this.context1.save(),this.context1.lineWidth=o.lineWidth,this.context1.strokeStyle=o.strokeStyle,this.context1.beginPath(),this.context1.moveTo(i[0].x,i[0].y),this.context1.lineTo(i[1].x,i[1].y),this.context1.lineTo(i[2].x,i[2].y),this.context1.lineTo(i[3].x,i[3].y),this.context1.closePath(),this.context1.stroke();for(var s=4;s<i.length-1;s+=2)this.context1.moveTo(i[s].x,i[s].y),this.context1.lineTo(i[s+1].x,i[s+1].y);this.context1.stroke(),this.context1.restore()},b.prototype.drawPanos=function(t){this.player||(this.player=this.app.core.get("Player"));for(var e=this.player.model.panos.list,i=0;i<e.length;++i){var n=e[i];if(n.floorIndex==t){var o=this.getVectorForRotate({x:n.position.x,y:-1*n.position.z},this.angle);this.drawCircle2(o),this.drawText(o,n.id)}}},b.prototype.drawText=function(t,e,i,n){this.context1.save(),this.context1.font="12px Microsoft YaHei";var o={x:t.x,y:t.y};i||(o=this.getScreenXY({x:t.x,y:t.y})),n?(this.context1.translate(o.x,o.y),this.context1.rotate(n),this.context1.fillText(e,0,0)):this.context1.fillText(e,o.x,o.y),this.context1.restore()},b.prototype.getVectorForRotate=function(t){var e=-1*this.angle;if(Math.abs(e)<.01||Math.abs(e-2*Math.PI)<.01)return t;var i={x:(this.cad_bounding.left+this.cad_bounding.right)/2,y:(this.cad_bounding.top+this.cad_bounding.down)/2},n=(t.x-i.x)*Math.cos(e)-(t.y-i.y)*Math.sin(e)+i.x,o=(t.y-i.y)*Math.cos(e)+(t.x-i.x)*Math.sin(e)+i.y;return t.x=n,t.y=o,t},b.prototype.Bounds=function(t,e,i,n){var o={};return o.leftBottom={x:t,y:e},o.rigthTop={x:i,y:n},o.leftTop={x:t,y:n},o.rightBottom={x:i,y:e},o.left=t,o.right=i,o.down=e,o.top=n,o},b.prototype.clearCanvas=function(t){1==t?this.context1.clearRect(0,0,this.canvas1.width,this.canvas1.height):this.context2.clearRect(0,0,this.canvas2.width,this.canvas2.height)},b.prototype.initMappingForImg=function(t,e){var i=Math.abs((this.canvas_bounding.right-this.canvas_bounding.left)/t),n=Math.abs((this.canvas_bounding.down-this.canvas_bounding.top)/e);this.center={x:0,y:0},this.imgRes=Math.min(i,n);var o=this.player.model.floors.index[0].boundingBox.getSize(new THREE.Vector3);i=Math.abs((this.canvas_bounding.right-this.canvas_bounding.left)/Math.abs(o.x)),n=Math.abs((this.canvas_bounding.down-this.canvas_bounding.top)/Math.abs(o.z)),this.resolution=Math.min(i,n)},b.prototype.drawCadImg=function(t,e,i,n){n<.3&&(n=.3),this.context1.save(),this.context1.globalAlpha=n,this.context1.translate(this.canvas1.width/2,this.canvas1.height/2),this.context1.rotate(e),this.context1.scale(i,i),this.context1.translate(-t.width/2,-t.height/2),this.context1.drawImage(t,0,0),this.context1.restore()},b.prototype.setPoints2d=function(t,e,i,n){var o=null;switch(t){case s:o=this.setSingleDoorPoints2d(e,i,n);break;case r:o=this.setDoubleDoorPoints2d(e,i,n);break;case a:o=this.setSlideDoorPoints2d(e,i,n);break;case h:o=this.setSingleWindowPoints2d(e,i);break;case c:o=this.setFrenchWindowPoints2d(e,i);break;case l:o=this.setBayWindowPoints2d(e,i,n)}return o},b.prototype.setBayWindowPoints2d=function(t,i,n){var o,s,r,a,h=e.createLine1(t,i),l=e.getDistance(t,i)/2,c=4/this.resolution+l,x={x:(t.x+i.x)/2,y:(t.y+i.y)/2},p=e.getVerticalLine(h,x),y=e.getParallelLineForDistance(p,l),u=e.getParallelLineForDistance(p,c);e.getDisForPoinLine(t,y.line1)>e.getDisForPoinLine(t,y.line2)?(o=y.line2,s=u.line2,r=y.line1,a=u.line1):(o=y.line1,s=u.line1,r=y.line2,a=u.line2);var d=e.getParallelLineForDistance(h,2/this.resolution),g=e.getParallelLineForDistance(h,1-2/this.resolution),v=e.getParallelLineForDistance(h,1),P=d.line1,f=d.line2,m=g.line2,b=v.line2,w=d.line2,S=d.line1,T=g.line1,I=v.line1,k=e.getIntersectionPoint(o,P),_=e.getIntersectionPoint(r,P),F=e.getIntersectionPoint(r,m),M=e.getIntersectionPoint(o,m),L=e.getIntersectionPoint(s,f),D=e.getIntersectionPoint(a,f),W=e.getIntersectionPoint(a,b),C=e.getIntersectionPoint(s,b),R=e.getIntersectionPoint(o,w),V=e.getIntersectionPoint(r,w),B=e.getIntersectionPoint(r,T),Y=e.getIntersectionPoint(o,T),X=e.getIntersectionPoint(s,S),A=e.getIntersectionPoint(a,S),E=e.getIntersectionPoint(a,I),O=e.getIntersectionPoint(s,I),q=[];return q.push(k),q.push(_),q.push(F),q.push(M),"LEFT"==n?e.isClockwise(q)?(q.push(L),q.push(D),q.push(W),q.push(C)):((q=[]).push(R),q.push(V),q.push(B),q.push(Y),q.push(X),q.push(A),q.push(E),q.push(O)):"RIGHT"==n&&(e.isClockwise(q)?((q=[]).push(R),q.push(V),q.push(B),q.push(Y),q.push(X),q.push(A),q.push(E),q.push(O)):(q.push(L),q.push(D),q.push(W),q.push(C))),q},b.prototype.setDoubleDoorPoints2d=function(t,i,n){var o=e.createLine1(t,i),s=e.getDistance(t,i),r=e.getParallelLineForDistance(o,s/2),a=e.getVerticalLine(o,t),h=e.getVerticalLine(o,i),l={x:(t.x+i.x)/2,y:(t.y+i.y)/2},c=e.getVerticalLine(o,l),x=e.getIntersectionPoint(r.line1,a),p=e.getIntersectionPoint(r.line2,a),y=e.getIntersectionPoint(r.line1,h),u=e.getIntersectionPoint(r.line2,h),d=e.getIntersectionPoint(r.line1,c),g=e.getIntersectionPoint(r.line2,c),v=[];return v.push(t),v.push(l),v.push(i),v.push(y),v.push(d),v.push(x),"LEFT"==n?e.isClockwise(v)||((v=[]).push(t),v.push(l),v.push(i),v.push(u),v.push(g),v.push(p)):"RIGHT"==n&&e.isClockwise(v)&&((v=[]).push(t),v.push(l),v.push(i),v.push(u),v.push(g),v.push(p)),v},b.prototype.setFrenchWindowPoints2d=function(t,i){var n=4/this.resolution,o=e.createLine1(t,i),s=e.getParallelLineForDistance(o,n),r=e.getVerticalLine(o,t),a=e.getVerticalLine(o,i),h=[];h.push(t),h.push(i);var l={x:(t.x+i.x)/2,y:(t.y+i.y)/2},c=e.getVerticalLine(o,l),x=e.getIntersectionPoint(r,s.line1),p=e.getIntersectionPoint(a,s.line1);h.push(x),h.push(p);var y=e.getIntersectionPoint(r,s.line2),u=e.getIntersectionPoint(a,s.line2);h.push(y),h.push(u);var d=e.getIntersectionPoint(c,s.line1),g=e.getIntersectionPoint(c,s.line2);return h.push(d),h.push(g),h},b.prototype.setSingleDoorPoints2d=function(t,i,n){var o=e.createLine1(t,i),s=e.getDistance(t,i),r=e.getParallelLineForDistance(o,s),a=e.getVerticalLine(o,t),h=e.getVerticalLine(o,i),l=e.getIntersectionPoint(r.line1,a),c=e.getIntersectionPoint(r.line2,a),x=e.getIntersectionPoint(r.line1,h),p=e.getIntersectionPoint(r.line2,h),y=[];return y.push(t),y.push(i),y.push(x),y.push(l),"LEFT"==n?e.isClockwise(y)||((y=[]).push(t),y.push(i),y.push(p),y.push(c)):"RIGHT"==n&&e.isClockwise(y)&&((y=[]).push(t),y.push(i),y.push(p),y.push(c)),y},b.prototype.setSingleWindowPoints2d=function(t,i){var n=[];n.push(t),n.push(i);var o=4/this.resolution,s=e.createLine1(t,i),r=e.getParallelLineForDistance(s,o),a=e.getVerticalLine(s,t),h=e.getVerticalLine(s,i),l=e.getIntersectionPoint(a,r.line1),c=e.getIntersectionPoint(h,r.line1),x=e.getIntersectionPoint(h,r.line2),p=e.getIntersectionPoint(a,r.line2);return n.push(l),n.push(c),n.push(x),n.push(p),n},b.prototype.setSlideDoorPoints2d=function(t,i,n){var o=e.createLine1(t,i),s=2/this.resolution,r=e.getParallelLineForDistance(o,s);if(t.x>i.x){var a=r.line1;r.line1=r.line2,r.line2=a}var h=e.getVerticalLine(o,t),l=e.getVerticalLine(o,i),c=r.line1,x=r.line2,p=e.getIntersectionPoint(r.line1,h),y=e.getIntersectionPoint(r.line2,l),u=[];u.push(t),u.push(i),u.push(p),e.isClockwise(u)?null==n||"LEFT"==n||(c=r.line2,x=r.line1,p=e.getIntersectionPoint(c,h),y=e.getIntersectionPoint(x,l)):null!=n&&"LEFT"!=n||(c=r.line2,x=r.line1,p=e.getIntersectionPoint(c,h),y=e.getIntersectionPoint(x,l));var d={x:(t.x+i.x)/2,y:(t.y+i.y)/2};(u=[]).push(t);var g=4/this.resolution,v=e.getVerticalLine(o,d),P=e.getParallelLineForDistance(v,g),f=e.getIntersectionPoint(c,P.line1),m=e.getIntersectionPoint(c,P.line2),b=e.getIntersectionPoint(x,P.line1),w=e.getIntersectionPoint(x,P.line2),S=e.getIntersectionPoint(o,P.line1),T=e.getIntersectionPoint(o,P.line2);return e.getDistance(t,S)<e.getDistance(t,T)?(u.push(T),u.push(m),u.push(p),u.push(i),u.push(S),u.push(b),u.push(y)):(u.push(S),u.push(f),u.push(p),u.push(i),u.push(T),u.push(w),u.push(y)),u},b.prototype.setSlideDoorPoints2d=function(t,i,n){var o=e.createLine1(t,i),s=2/this.resolution,r=e.getParallelLineForDistance(o,s);if(t.x>i.x){var a=r.line1;r.line1=r.line2,r.line2=a}var h=e.getVerticalLine(o,t),l=e.getVerticalLine(o,i),c=r.line1,x=r.line2,p=e.getIntersectionPoint(r.line1,h),y=e.getIntersectionPoint(r.line2,l),u=[];u.push(t),u.push(i),u.push(p),e.isClockwise(u)?null==n||"LEFT"==n||(c=r.line2,x=r.line1,p=e.getIntersectionPoint(c,h),y=e.getIntersectionPoint(x,l)):null!=n&&"LEFT"!=n||(c=r.line2,x=r.line1,p=e.getIntersectionPoint(c,h),y=e.getIntersectionPoint(x,l));var d={x:(t.x+i.x)/2,y:(t.y+i.y)/2};(u=[]).push(t);var g=4/this.resolution,v=e.getVerticalLine(o,d),P=e.getParallelLineForDistance(v,g),f=e.getIntersectionPoint(c,P.line1),m=e.getIntersectionPoint(c,P.line2),b=e.getIntersectionPoint(x,P.line1),w=e.getIntersectionPoint(x,P.line2),S=e.getIntersectionPoint(o,P.line1),T=e.getIntersectionPoint(o,P.line2);return e.getDistance(t,S)<e.getDistance(t,T)?(u.push(T),u.push(m),u.push(p),u.push(i),u.push(S),u.push(b),u.push(y)):(u.push(S),u.push(f),u.push(p),u.push(i),u.push(T),u.push(w),u.push(y)),u},function(t,e){void 0===e&&(e={});var i=KanKan.Deferred(),n=null;e.el&&(n="string"===e.el?document.querySelector(e.el):e.el);var o=function(){var o=new b(t,n||t.dom,e);o.$scope=n,o.$html='<div v-cloak v-scope xui_min_map @vue:mounted="create" :class="{show:show}"> <canvas xui_min_map_cad></canvas> <canvas xui_min_map_img></canvas> <canvas xui_min_map_dir></canvas> </div> <style> [xui_min_map] {\r\n        visibility: hidden;\r\n        position: absolute;\r\n        pointer-events: all;\r\n        width: 204px;\r\n        height: 200px;\r\n        background-color: rgba(0, 0, 0, 0.3);\r\n        border-radius: 10px;\r\n    }\r\n    [xui_min_map] canvas {\r\n        position: absolute;\r\n        width: 100%;\r\n        height: 100%;\r\n        top: 0;\r\n        left: 0;\r\n    }\r\n\r\n    [xui_min_map].show {\r\n        visibility: visible;\r\n    } </style> ',o.$name="MinMap",o.$load=function(){PetiteVue.createApp({show:!1,create:function(){o.$xui=this,o.init(),t.store.getValue("metadata").controls.showMap||o.hide(),t.MinMap.install(o)}}).mount((n||t.dom).querySelector("[xui_min_map]"))},i.resolve(o)};return t.Scene.loaded?o():t.Scene.on("loaded",o),i}}();
