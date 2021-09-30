(()=>{"use strict";const t={worldSize:[12,12],tickTime:1e3,backgroundColor:"#fff",unitColor:"rgba(222,80,50,1)"};var e,r=function(){function e(e){this.wrapper=e,this.children=this.wrapper.querySelectorAll(":scope > div");var r=t.worldSize,n=r[0],i=r[1];this.wrapper.style.gridTemplate="repeat("+n+","+100/n+"%)/repeat("+i+","+100/i+"%)"}return e.prototype.render=function(t){var e=this,r=t.map,n=t.prevMap;Object.keys(n).forEach((function(t){var i=e.wrapper.querySelector('[data-idx="'+t+'"]');n[t],i.style.backgroundColor=r[t].color}))},e.prototype.start=function(){this.wrapper.classList.add("start")},e.prototype.stop=function(){this.wrapper.classList.remove("start")},e}(),n=t.backgroundColor,i=t.unitColor,o=function(){function t(t,e,r){this.x=e,this.y=r,this.life=t}return Object.defineProperty(t.prototype,"life",{get:function(){return this.isLife},set:function(t){this.isLife=t,this.color=t?i:n},enumerable:!1,configurable:!0}),t}(),a=function(){function t(t,e){var r=t.worldSize,n=r[0],i=r[1];this.x=n,this.y=i,this.map=e,this.prevMap={},this.setMapList(Object.keys(this.map)),this.lifeCount=this.cntLifeDot()}return t.prototype.cntLifeDot=function(){return Object.keys(this.prevTrueMap).length},t.prototype.on=function(t){var e=this;return this.setMapList(t,(function(t){e.map[t].life=!0})),this},t.prototype.off=function(t){var e=this;return this.setMapList(t,(function(t){e.map[t].life=!1})),this},t.prototype.toggle=function(t){var e=this;return this.setMapList(t,(function(t){e.map[t].life=!e.map[t].life})),this},t.prototype.setMapList=function(t,e){var r="string"==typeof t?[t]:t;e&&r.forEach((function(t){e(t)})),this.setPrevMap(r)},t.prototype.setPrevMap=function(t){var e=this;t.forEach((function(t){e.prevMap[t]=e.map[t].life})),this.prevTrueMap=Object.keys(this.prevMap).filter((function(t){return e.map[t].life})).reduce((function(t,r){return t[r]=e.map[r],t}),{}),this.lifeCount=this.cntLifeDot()},t}(),s=function(t){this.fns=t},c=function(){function t(t){this.thread=navigator.hardwareConcurrency?navigator.hardwareConcurrency:1,this.fns=t,this.worker=[];for(var e=0;e<this.thread;e++)this.worker.push(new s(t));console.log(this)}return t.prototype.run=function(t,e){},t.prototype.divArray=function(t){this.thread},t}(),p=(e=function(t,r){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},e(t,r)},function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}),u=function(t){function e(e,r){var n=t.call(this,e,r)||this;return n.tick=e.tickTime,n.worker=new c({start:n.start,stop:n.stop,cntIsLife:n.cntIsLife,getNeighbor:n.getNeighbor,getUpdateTarget:n.getUpdateTarget,update:n.update,cntLifeDot:n.cntLifeDot,on:n.on,off:n.off,toggle:n.toggle,setMapList:n.setMapList,setPrevMap:n.setPrevMap}),n.thread=n.worker.thread,n}return p(e,t),e.prototype.start=function(t){var e=this;void 0===this.interval&&(this.renderer=t,this.renderer.start(),this.interval=setInterval((function(){console.time("interval"),e.update(),console.timeEnd("interval")}),this.tick))},e.prototype.stop=function(){clearInterval(this.interval),this.renderer.stop(),this.interval=void 0},e.prototype.cntIsLife=function(t){var e=this,r=0;return this.getNeighbor(t).forEach((function(t){e.prevMap[t]&&r++})),r},e.prototype.getNeighbor=function(t){var e=this,r=t.split("-").map((function(t){return+t})),n=r[0],i=r[1],o=function(t,r){return t*e.y+r};return[this.map[n-1+"-"+(i-1)+"-"+o(n-1,i-1)]?n-1+"-"+(i-1)+"-"+o(n-1,i-1):"",this.map[n-1+"-"+i+"-"+o(n-1,i)]?n-1+"-"+i+"-"+o(n-1,i):"",this.map[n-1+"-"+(i+1)+"-"+o(n-1,i+1)]?n-1+"-"+(i+1)+"-"+o(n-1,i+1):"",this.map[n+"-"+(i-1)+"-"+o(n,i-1)]?n+"-"+(i-1)+"-"+o(n,i-1):"",this.map[n+"-"+(i+1)+"-"+o(n,i+1)]?n+"-"+(i+1)+"-"+o(n,i+1):"",this.map[n+1+"-"+(i-1)+"-"+o(n+1,i-1)]?n+1+"-"+(i-1)+"-"+o(n+1,i-1):"",this.map[n+1+"-"+i+"-"+o(n+1,i)]?n+1+"-"+i+"-"+o(n+1,i):"",this.map[n+1+"-"+(i+1)+"-"+o(n+1,i+1)]?n+1+"-"+(i+1)+"-"+o(n+1,i+1):""].filter((function(t){return""!==t}))},e.prototype.getUpdateTarget=function(){var t=this;return Array.from(new Set(Object.keys(this.prevTrueMap).reduce((function(e,r){var n=t.getNeighbor(r);return e.concat(n)}),[]).concat(Object.keys(this.prevTrueMap))))},e.prototype.update=function(){var t=this,e=this.getUpdateTarget();return this.setMapList(e,(function(e){switch(t.cntIsLife(e)){case 2:!0===t.map[e].life?t.map[e].life=!0:t.map[e].life=!1;break;case 3:t.map[e].life=!0;break;default:t.map[e].life=!1}})),this},e}(a),f=t.worldSize,h=f[0],l=f[1],v=h*l;const y=function(t){var e=0,r=new Array(v).fill(1).reduce((function(t,r,n){var i=Math.floor(n/h),a=n%l,s=Math.round(10*Math.random())%2==0&&e<120;return s&&e++,t[i+"-"+a+"-"+n]=new o(s,i,a),t}),{});return new u(t,r)};!function(){var e,n,i,o;e=this,n=void 0,o=function(){var e,n;return function(t,e){var r,n,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,n=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=e.call(t,a)}catch(t){o=[6,t],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}(this,(function(i){return(e=t.worldSize)[0],e[1],n=document.querySelector("#wrapper"),window.world=y(t),window.demo=new r(n),[2]}))},new((i=void 0)||(i=Promise))((function(t,r){function a(t){try{c(o.next(t))}catch(t){r(t)}}function s(t){try{c(o.throw(t))}catch(t){r(t)}}function c(e){var r;e.done?t(e.value):(r=e.value,r instanceof i?r:new i((function(t){t(r)}))).then(a,s)}c((o=o.apply(e,n||[])).next())}))}()})();