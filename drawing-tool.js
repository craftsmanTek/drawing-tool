!function(){"use strict";var t="undefined"!=typeof window?window:global;if("function"!=typeof t.require){var e={},o={},i=function(t,e){return{}.hasOwnProperty.call(t,e)},s=function(t,e){var o,i,s=[];o=/^\.\.?(\/|$)/.test(e)?[t,e].join("/").split("/"):e.split("/");for(var r=0,n=o.length;n>r;r++)i=o[r],".."===i?s.pop():"."!==i&&""!==i&&s.push(i);return s.join("/")},r=function(t){return t.split("/").slice(0,-1).join("/")},n=function(e){return function(o){var i=r(e),n=s(i,o);return t.require(n,e)}},c=function(t,e){var i={id:t,exports:{}};return o[t]=i,e(i.exports,n(t),i),i.exports},a=function(t,r){var n=s(t,".");if(null==r&&(r="/"),i(o,n))return o[n].exports;if(i(e,n))return c(n,e[n]);var a=s(n,"./index");if(i(o,a))return o[a].exports;if(i(e,a))return c(a,e[a]);throw new Error('Cannot find module "'+t+'" from "'+r+'"')},l=function(t,o){if("object"==typeof t)for(var s in t)i(t,s)&&(e[s]=t[s]);else e[t]=o},p=function(){var t=[];for(var o in e)i(e,o)&&t.push(o);return t};t.require=a,t.require.define=l,t.require.register=l,t.require.list=p,t.require.brunch=!0}}(),require.register("scripts/drawing-tool",function(t,e,o){function i(t){console.log("Drawing Tool created"),this.canvas=new fabric.Canvas(t),this.canvas.perPixelTargetFind=!0,fabric.Object.prototype.transparentCorners=!1,fabric.Object.prototype.selectable=!1,fabric.Object.prototype.strokeWidth=10,fabric.Object.prototype.stroke="rgba(100,200,200,0.75)",fabric.Object.prototype.fill="",fabric.Group.prototype.selectable=!0,this.getCanvas=function(){return this.canvas};var e=this,o=new s("Selection Tool","select",this),i=new r("Line Tool","line",this),a=new n("Rectangle Tool","rect",this),l=new c("Ellipse Tool","ellipse",this);this.tools={select:o,line:i,rect:a,ellipse:l},this.currentTool,this.chooseTool("select"),$(".btn").click(function(){var t=$(this).find("input").val();e.chooseTool(t)}),console.log("drawing tool constructor finished")}{var s=(e("scripts/tool"),e("scripts/select-tool")),r=e("scripts/line-tool"),n=e("scripts/rect-tool"),c=e("scripts/ellipse-tool");e("scripts/util")}i.prototype.chooseTool=function(t){if(void 0!==this.currentTool&&this.currentTool.selector===t)return void console.log(this.currentTool.name+" is already the current tool");var e=this.tools[t];if(void 0===e)return void console.warn('Warning! Could not find tool with selector "'+t+'"\nExiting tool chooser.');try{console.log("Choosing "+e.name+" over "+this.currentTool.name),this.currentTool.setActive(!1);var o=this.currentTool}catch(i){console.log("Choosing "+e.name)}e.setActive(!0),this.currentTool=e;var s="#"+t;return $(s).hasClass("active")||$("#"+t).click(),o},i.prototype.changeOutOfTool=function(){this.chooseTool("select")},i.prototype.check=function(){for(var t=this.canvas.getObjects(),e=0;e<t.length;e++)console.log(t[e].selectable+" "+t[e])},o.exports=i}),require.register("scripts/ellipse-tool",function(t,e,o){function i(t,e,o){s.call(this,t,e,o),this.curr;var i=this;this.addEventListener("mouse:down",function(t){i.mouseDown(t)}),this.addEventListener("mouse:move",function(t){i.mouseMove(t)}),this.addEventListener("mouse:up",function(t){i.mouseUp(t)})}{var s=e("scripts/shape-tool");e("scripts/util")}i.prototype=Object.create(s.prototype),i.prototype.constructor=i,i.prototype.parent=s.prototype,i.prototype.mouseDown=function(t){console.log("ellipse down"),this.parent.mouseDown.call(this,t);var e=t.e.offsetX,o=t.e.offsetY;this.curr=new fabric.Ellipse({top:o-100,left:e-50,rx:50,ry:100,selectable:!1}),this.canvas.add(this.curr)},i.prototype.mouseMove=function(t){if(this.parent.mouseMove.call(this,t),this.down!==!1){console.log("moved "+this.moved);var e=t.e.offsetX,o=t.e.offsetY,i=this.curr.left,s=this.curr.top;this.curr.set("rx",(e-i)/2),this.curr.set("ry",(o-s)/2),this.canvas.renderAll(!1)}},i.prototype.mouseUp=function(t){console.log("ellipse up"),this.parent.mouseUp.call(this,t),this.curr=void 0,this.actionComplete()},i.prototype.activate=function(){this.parent.activate.call(this)},o.exports=i}),require.register("scripts/line-tool",function(t,e,o){function i(t,e,o){s.call(this,t,e,o),this.curr;var i=this;this.addEventListener("mouse:down",function(t){i.mouseDown(t)}),this.addEventListener("mouse:move",function(t){i.mouseMove(t)}),this.addEventListener("mouse:up",function(t){i.mouseUp(t)})}var s=e("scripts/shape-tool"),r=e("scripts/util");i.prototype=Object.create(s.prototype),i.prototype.constructor=i,i.prototype.parent=s.prototype,i.prototype.mouseDown=function(t){console.log("down"),this.parent.mouseDown.call(this,t);var e=t.e.offsetX,o=t.e.offsetY;this.curr=new fabric.Line([e,o,e,o],{selectable:!1}),this.canvas.add(this.curr)},i.prototype.mouseMove=function(t){if(this.parent.mouseMove.call(this,t),this.down!==!1){console.log("moved "+this.moved);var e=t.e.offsetX,o=t.e.offsetY;this.curr.set("x2",e),this.curr.set("y2",o),this.canvas.renderAll(!1)}},i.prototype.mouseUp=function(t){console.log("line up"),this.parent.mouseUp.call(this,t),this.canvas.remove(this.curr);var e=this.curr.get("x1"),o=this.curr.get("y1"),i=this.curr.get("x2"),s=this.curr.get("y2");if(this.moved&&r.dist(i-e,s-o)>3){var n=new fabric.Line([e,o,i,s],{});this.canvas.add(n),this.actionComplete(),console.log("new line constructed")}else this.parent.exit.call(this);this.curr=void 0},i.prototype.activate=function(){this.parent.activate.call(this)},o.exports=i}),require.register("scripts/rect-tool",function(t,e,o){function i(t,e,o){s.call(this,t,e,o),this.curr;var i=this;this.addEventListener("mouse:down",function(t){i.mouseDown(t)}),this.addEventListener("mouse:move",function(t){i.mouseMove(t)}),this.addEventListener("mouse:up",function(t){i.mouseUp(t)})}var s=e("scripts/shape-tool"),r=e("scripts/util");i.prototype=Object.create(s.prototype),i.prototype.constructor=i,i.prototype.parent=s.prototype,i.prototype.mouseDown=function(t){console.log("down"),this.parent.mouseDown.call(this,t);var e=t.e.offsetX,o=t.e.offsetY;this.curr=new fabric.Rect({top:o,left:e,width:0,height:0,selectable:!1}),this.canvas.add(this.curr)},i.prototype.mouseMove=function(t){if(this.parent.mouseMove.call(this,t),this.down!==!1){console.log("moved "+this.moved);var e=t.e.offsetX,o=t.e.offsetY,i=this.curr.left,s=this.curr.top;this.curr.width=e-i,this.curr.height=o-s,this.canvas.renderAll(!1)}},i.prototype.mouseUp=function(t){console.log("rect up"),this.parent.mouseUp.call(this,t),this.canvas.remove(this.curr);var e=this.curr.top,o=this.curr.left,i=this.curr.height,s=this.curr.width;if(this.moved&&r.dist(s,i)>3){0>s&&(o+=s,s=-s),0>i&&(e+=i,i=-i);var n=new fabric.Rect({top:e,left:o,width:s,height:i});this.canvas.add(n),this.actionComplete(),console.log("Rect constructed")}else this.parent.exit.call(this);this.curr=void 0},i.prototype.activate=function(){this.parent.activate.call(this)},o.exports=i}),require.register("scripts/select-tool",function(t,e,o){function i(t,e,o){s.call(this,t,e,o)}var s=e("scripts/tool");i.prototype=Object.create(s.prototype),i.prototype.constructor=i,i.prototype.$super=s.prototype,i.prototype.activate=function(){this.setSelectable(!0)},i.prototype.deactivate=function(){this.setSelectable(!1)},i.prototype.setSelectable=function(t){this.canvas.selection=t;for(var e=this.canvas.getObjects(),o=e.length-1;o>=0;o--)e[o].selectable=t},o.exports=i}),require.register("scripts/shape-tool",function(t,e,o){function i(t,e,o){s.call(this,t,e,o),this.moved=!1,this.down=!1,this._firstAction=!1}var s=e("scripts/tool");i.prototype=Object.create(s.prototype),i.prototype.constructor=i,i.prototype.tool=s.prototype,i.prototype.activate=function(){this.tool.activate.call(this),this.moved=!1,this.down=!1,this._firstAction=!0},i.prototype.exit=function(){console.info("changing out of "+this.name),this.down=!1,this.moved=!1,this.master.changeOutOfTool(this.selector)},i.prototype.mouseDown=function(t){this.down=!0,this.moved=!1,this._firstAction===!1&&void 0!==t.target&&this.exit()},i.prototype.mouseMove=function(){this.moved===!1&&this.down===!0&&(this.moved=!0)},i.prototype.mouseUp=function(){this.down=!1,this.moved===!1&&this.exit()},i.prototype.actionComplete=function(){this._firstAction=!1,this._setAllObjectsSelectable(!0)},i.prototype._setAllObjectsSelectable=function(t){for(var e=this.canvas.getObjects(),o=e.length-1;o>=0;o--)e[o].selectable=t},o.exports=i}),require.register("scripts/tool",function(t,e,o){function i(t,e,o){console.info(t),this.name=t||"Tool",this.selector=e||"",this.master=o,this.canvas=o.canvas,this.active=!1,this.listeners=[]}i.prototype.setActive=function(t){return this.active===t?t:(this.active=t,t===!0?(console.log("Activating "+this.name),this.activate()):(console.log("Deactivating "+this.name),this.deactivate()),t)},i.prototype.isActive=function(){return this.active},i.prototype.activate=function(){for(var t=0;t<this.listeners.length;t++){var e=this.listeners[t].trigger,o=this.listeners[t].action;this.canvas.on(e,o)}},i.prototype.deactivate=function(){for(var t=0;t<this.listeners.length;t++){{var e=this.listeners[t].trigger;this.listeners[t].action}this.canvas.off(e)}},i.prototype.addEventListener=function(t,e){this.listeners[this.listeners.length]={trigger:t,action:e}},i.prototype.removeEventListener=function(t){for(var e=0;e<this.listeners.length;e++)if(t==this.listeners[e].trigger)return this.listeners.splice(e,1)},o.exports=i}),require.register("scripts/util",function(t,e,o){function i(){}i.dist=function(t,e){var o=Math.pow(t,2),i=Math.pow(e,2);return Math.sqrt(o+i)},o.exports=i}),window.DrawingTool=require("scripts/drawing-tool");