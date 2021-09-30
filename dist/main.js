(()=>{"use strict";var t=function(){function t(t,e){this.wrapper=t,this.isObserving=!1,this.world=e,this.scale=2,this.prevMap=[],this.initCanvas(),this.onResize()}return t.prototype.initCanvas=function(){this.canvas=document.createElement("canvas"),this.canvas.style.width="100vmin",this.canvas.style.height="100vmin",this.ctx=this.canvas.getContext("2d"),this.ctx.fillStyle=this.world.color,this.wrapper.append(this.canvas)},t.prototype.render=function(t){var e=this.diff(this.prevMap,t);e[0],e[1],this.prevMap=t},t.prototype.diff=function(t,e){var r=this,n=e.filter((function(e){return!t.includes(e)})),i=t.filter((function(t){return!e.includes(t)}));return n.forEach((function(t){var e=t.split("-"),n=e[0],i=e[1];r.draw(+i,+n)})),i.forEach((function(t){var e=t.split("-"),n=e[0],i=e[1];r.erase(+i,+n)})),[n,i]},t.prototype.draw=function(t,e){var r=this.lifeSize;this.ctx.fillRect(t*r,e*r,r,r)},t.prototype.erase=function(t,e){var r=this.lifeSize;this.ctx.clearRect(t*r,e*r,r,r)},t.prototype.setLifeSize=function(){var t=+window.getComputedStyle(this.wrapper).width.replace("px","");this.lifeSize=+(t/this.world.x*this.scale).toFixed(4)},t.prototype.onResize=function(){var t=this,e=this.wrapper,r=new ResizeObserver((function(){requestAnimationFrame((function(){t.setCanvasSize()}))}));r.observe(e),this.resizeObserver=r,this.isObserving=!0},t.prototype.offResize=function(){var t=this.wrapper;this.resizeObserver&&(this.resizeObserver.unobserve(t),this.isObserving=!1)},t.prototype.setCanvasSize=function(){var t=+window.getComputedStyle(this.wrapper).width.replace("px",""),e=+window.getComputedStyle(this.wrapper).height.replace("px",""),r=window.devicePixelRatio;this.canvasWidth=t*this.scale*r,this.canvasHeight=e*this.scale*r,this.canvas.setAttribute("width",""+this.canvasWidth),this.canvas.setAttribute("height",""+this.canvasHeight),this.setLifeSize()},t}();const e={worldSize:[64,64],tickTime:50,backgroundColor:"#fff",unitColor:"rgba(222,80,50,1)"};var r,n=e.backgroundColor,i=e.unitColor,o=function(){function t(t,e,r){this.x=e,this.y=r,this.life=t}return Object.defineProperty(t.prototype,"life",{get:function(){return this.isLife},set:function(t){this.isLife=t,this.color=t?i:n},enumerable:!1,configurable:!0}),t}(),a=function(){function t(t,e){var r=t.worldSize,n=r[0],i=r[1];this.x=n,this.y=i,this.map=e,this.prevMap={},this.setMapList(Object.keys(this.map)),this.lifeCount=this.cntLifeDot()}return t.prototype.cntLifeDot=function(){return this.prevTrueMap.length},t.prototype.on=function(t){var e=this;return this.setMapList(t,(function(t){e.map[t].life=!0})),this},t.prototype.off=function(t){var e=this;return this.setMapList(t,(function(t){e.map[t].life=!1})),this},t.prototype.toggle=function(t){var e=this;return this.setMapList(t,(function(t){e.map[t].life=!e.map[t].life})),this},t.prototype.setMapList=function(t,e){var r="string"==typeof t?[t]:t;e&&r.forEach((function(t){e(t)})),this.setPrevMap(r)},t.prototype.setPrevMap=function(t){var e=this;t.forEach((function(t){e.prevMap[t]=e.map[t].life})),this.prevTrueMap=Object.keys(this.prevMap).filter((function(t){return e.map[t].life})),this.lifeCount=this.cntLifeDot()},t}(),s=(r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},r(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),c=function(t){function e(e,r){var n=t.call(this,e,r)||this;return n.tick=e.tickTime,n.color=e.unitColor,n}return s(e,t),e.prototype.start=function(t){var e=this;void 0===this.interval&&(this.renderer=t,this.interval=setInterval((function(){console.time("interval"),e.update(),console.timeLog("interval"," :: to calc"),e.renderer.render(e.prevTrueMap),console.timeEnd("interval")}),this.tick))},e.prototype.stop=function(){clearInterval(this.interval),this.interval=void 0},e.prototype.cntIsLife=function(t){var e=this,r=0;return this.getNeighbor(t).forEach((function(t){e.prevMap[t]&&r++})),r},e.prototype.getNeighbor=function(t){var e=this,r=t.split("-").map((function(t){return+t})),n=r[0],i=r[1],o=function(t,r){return t*e.y+r};return[this.map[n-1+"-"+(i-1)+"-"+o(n-1,i-1)]?n-1+"-"+(i-1)+"-"+o(n-1,i-1):"",this.map[n-1+"-"+i+"-"+o(n-1,i)]?n-1+"-"+i+"-"+o(n-1,i):"",this.map[n-1+"-"+(i+1)+"-"+o(n-1,i+1)]?n-1+"-"+(i+1)+"-"+o(n-1,i+1):"",this.map[n+"-"+(i-1)+"-"+o(n,i-1)]?n+"-"+(i-1)+"-"+o(n,i-1):"",this.map[n+"-"+(i+1)+"-"+o(n,i+1)]?n+"-"+(i+1)+"-"+o(n,i+1):"",this.map[n+1+"-"+(i-1)+"-"+o(n+1,i-1)]?n+1+"-"+(i-1)+"-"+o(n+1,i-1):"",this.map[n+1+"-"+i+"-"+o(n+1,i)]?n+1+"-"+i+"-"+o(n+1,i):"",this.map[n+1+"-"+(i+1)+"-"+o(n+1,i+1)]?n+1+"-"+(i+1)+"-"+o(n+1,i+1):""].filter((function(t){return""!==t}))},e.prototype.getUpdateTarget=function(){var t=this;return Array.from(new Set(this.prevTrueMap.reduce((function(e,r){var n=t.getNeighbor(r);return e.concat(n)}),[]).concat(this.prevTrueMap)))},e.prototype.update=function(){var t=this,e=this.getUpdateTarget();return this.setMapList(e,(function(e){switch(t.cntIsLife(e)){case 2:!0===t.map[e].life?t.map[e].life=!0:t.map[e].life=!1;break;case 3:t.map[e].life=!0;break;default:t.map[e].life=!1}})),this},e}(a),u=function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},t(e,r)};return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),p=function(t){function e(e,r){var n=t.call(this,e,r)||this;return n.$thread=navigator.hardwareConcurrency?navigator.hardwareConcurrency:1,n}return u(e,t),e.prototype.$balancing=function(t){for(var e=this.$thread,r=Math.floor(t.length/e),n=t.length%e,i=[],o=0,a=0;a<this.$thread;a++){var s=r;a<n&&s++,i.push(t.slice(o,o+s)),o+=s}return i.filter((function(t){return t.length}))},e}(c),h=e.worldSize,f=h[0],l=h[1],v=f*l;const d=function(t){var e=new Array(v).fill(1).reduce((function(t,e,r){var n=Math.floor(r/f),i=r%l,a=Math.round(10*Math.random())%2==0;return t[n+"-"+i+"-"+r]=new o(a,n,i),t}),{});return new p(t,e)};!function(){var r,n,i,o;r=this,n=void 0,o=function(){var r,n;return function(t,e){var r,n,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,n=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=e.call(t,a)}catch(t){o=[6,t],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}(this,(function(i){return(r=e.worldSize)[0],r[1],n=document.querySelector("#wrapper"),window.world=d(e),window.renderer=new t(n,window.world),[2]}))},new((i=void 0)||(i=Promise))((function(t,e){function a(t){try{c(o.next(t))}catch(t){e(t)}}function s(t){try{c(o.throw(t))}catch(t){e(t)}}function c(e){var r;e.done?t(e.value):(r=e.value,r instanceof i?r:new i((function(t){t(r)}))).then(a,s)}c((o=o.apply(r,n||[])).next())}))}()})();