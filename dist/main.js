(()=>{"use strict";var t={187:(t,e,r)=>{r.r(e)},212:function(t,e,r){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.Demo=void 0;var o=i(r(658)),n=function(){function t(t){this.wrapper=t,this.children=this.wrapper.querySelectorAll(":scope > div");var e=o.default.worldSize,r=e[0],i=e[1];this.wrapper.style.gridTemplate="repeat("+r+",("+100/r+"%))/repeat("+i+","+100/i+"%)"}return t.prototype.render=function(t){var e=this,r=t.map,i=t.prevMap;Object.keys(i).forEach((function(t){var o=e.wrapper.querySelector('[data-idx="'+t+'"]');i[t],o.style.backgroundColor=r[t].color}))},t}();e.Demo=n},286:function(t,e,r){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.Dot=void 0;var o=i(r(658)),n=o.default.backgroundColor,a=o.default.unitColor,u=function(){function t(t,e,r){this.x=e,this.y=r,this.life=t}return Object.defineProperty(t.prototype,"life",{get:function(){return this.isLife},set:function(t){this.isLife=t,this.color=t?a:n},enumerable:!1,configurable:!0}),t}();e.Dot=u},806:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Grid=void 0;var r=function(){function t(t,e){var r=t.worldSize,i=r[0],o=r[1];this.x=i,this.y=o,this.map=e,this.prevMap={},this.setMapList(Object.keys(this.map)),this.lifeCount=this.cntLifeDot()}return t.prototype.cntLifeDot=function(){return Object.keys(this.prevTrueMap).length},t.prototype.on=function(t){var e=this;return this.setMapList(t,(function(t){e.map[t].life=!0})),this},t.prototype.off=function(t){var e=this;return this.setMapList(t,(function(t){e.map[t].life=!1})),this},t.prototype.toggle=function(t){var e=this;return this.setMapList(t,(function(t){e.map[t].life=!e.map[t].life})),this},t.prototype.setMapList=function(t,e){var r="string"==typeof t?[t]:t;e&&r.forEach((function(t){e(t)})),this.setPrevMap(r)},t.prototype.setPrevMap=function(t){var e=this;this.prevTrueMap=this.prevTrueMap?this.prevTrueMap:{},t.forEach((function(t){e.prevMap[t]=e.map[t].life,e.map[t].life&&(e.prevTrueMap[t]=!0)})),this.lifeCount=this.cntLifeDot()},t}();e.Grid=r},672:function(t,e,r){var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0}),e.Simulator=void 0;var n=function(t){function e(e,r){var i=t.call(this,e,r)||this;return i.tick=e.tickTime,i.start(),i}return o(e,t),e.prototype.start=function(){var t=this;this.interval=setInterval((function(){t.update(),window.demo.render(t)}),this.tick)},e.prototype.stop=function(){clearInterval(this.interval)},e.prototype.cntIsLife=function(t){var e=this,r=0;return this.getNeighbor(t).forEach((function(t){void 0!==t&&e.map[t]&&!0===e.map[t].life&&r++})),r},e.prototype.getNeighbor=function(t){var e=this,r=t.split("-").map((function(t){return+t})),i=r[0],o=r[1],n=function(t,r){return t*e.y+r};return[this.map[i-1+"-"+(o-1)+"-"+n(i-1,o-1)]?i-1+"-"+(o-1)+"-"+n(i-1,o-1):"",this.map[i-1+"-"+o+"-"+n(i-1,o)]?i-1+"-"+o+"-"+n(i-1,o):"",this.map[i-1+"-"+(o+1)+"-"+n(i-1,o+1)]?i-1+"-"+(o+1)+"-"+n(i-1,o+1):"",this.map[i+"-"+(o-1)+"-"+n(i,o-1)]?i+"-"+(o-1)+"-"+n(i,o-1):"",this.map[i+"-"+(o+1)+"-"+n(i,o+1)]?i+"-"+(o+1)+"-"+n(i,o+1):"",this.map[i+1+"-"+(o-1)+"-"+n(i+1,o-1)]?i+1+"-"+(o-1)+"-"+n(i+1,o-1):"",this.map[i+1+"-"+o+"-"+n(i+1,o)]?i+1+"-"+o+"-"+n(i+1,o):"",this.map[i+1+"-"+(o+1)+"-"+n(i+1,o+1)]?i+1+"-"+(o+1)+"-"+n(i+1,o+1):""]},e.prototype.getUpdateTarget=function(){var t=this;return Array.from(new Set(Object.keys(this.prevTrueMap).reduce((function(e,r){var i=t.getNeighbor(r).filter((function(t){return""!==t}));return e.concat(i)}),[])))},e.prototype.update=function(){var t=this,e=Object.keys(this.prevMap);return this.setMapList(e,(function(e){var r=t.cntIsLife(e);switch(0===r&&!0===t.map[e].life&&console.log(t.map[e]),r){case 2:!0===t.map[e].life?t.map[e].life=!0:t.map[e].life=!1;break;case 3:t.map[e].life=!0;break;default:t.map[e].life=!1}})),this},e}(r(806).Grid);e.Simulator=n},178:function(t,e,r){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=r(286),n=i(r(658)),a=r(672),u=n.default.worldSize,p=u[0],s=u[1],f=p*s;e.default=function(t){var e=new Array(f).fill(1).reduce((function(t,e,r){var i=Math.floor(r/p),n=r%s,a=Math.round(10*Math.random())%2==0;return t[i+"-"+n+"-"+r]=new o.Dot(a,i,n),t}),{});return new a.Simulator(t,e)}},519:function(t,e,r){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=r(212),n=i(r(178)),a=i(r(658));r(187),function(){for(var t=a.default.worldSize,e=t[0],r=t[1],i=e*r,u=document.querySelector("#wrapper"),p=0;p<i;p++){var s=Math.floor(p/e),f=p%r,c=document.createElement("div");c.setAttribute("data-idx",s+"-"+f+"-"+p),null==u||u.append(c)}window.world=(0,n.default)(a.default),window.demo=new o.Demo(u)}()},658:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default={worldSize:[48,48],tickTime:50,backgroundColor:"#fff",unitColor:"rgba(222,80,50,1)"}}},e={};function r(i){var o=e[i];if(void 0!==o)return o.exports;var n=e[i]={exports:{}};return t[i].call(n.exports,n,n.exports,r),n.exports}r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r(519)})();