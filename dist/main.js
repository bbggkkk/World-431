(()=>{"use strict";var t=function(){function t(t,e){this.wrapper=t,this.isObserving=!1,this.world=e,this.scale=4,this.prevMap=[],this.initCanvas(),this.onResize()}return t.prototype.initCanvas=function(){this.canvas=document.createElement("canvas"),this.canvas.style.width="100vmin",this.canvas.style.height="100vmin",this.ctx=this.canvas.getContext("2d"),this.ctx.fillStyle=this.world.color,this.wrapper.append(this.canvas)},t.prototype.render=function(t){var e=this.diff(this.prevMap,t);e[0],e[1],this.prevMap=t},t.prototype.diff=function(t,e){var i=this,r=e.filter((function(e){return!t.includes(e)})),n=t.filter((function(t){return!e.includes(t)}));return r.forEach((function(t){var e=t.split("-"),r=e[0],n=e[1];i.draw(+n,+r)})),n.forEach((function(t){var e=t.split("-"),r=e[0],n=e[1];i.erase(+n,+r)})),[r,n]},t.prototype.draw=function(t,e){var i=this.lifeSize;this.ctx.fillRect(t*i,e*i,i,i)},t.prototype.erase=function(t,e){var i=this.lifeSize;this.ctx.clearRect(t*i-.5,e*i-.5,i+1,i+1)},t.prototype.setLifeSize=function(){var t=+window.getComputedStyle(this.wrapper).width.replace("px","");this.lifeSize=+(t/this.world.x*this.scale).toFixed(4)},t.prototype.onResize=function(){var t=this,e=this.wrapper,i=new ResizeObserver((function(){requestAnimationFrame((function(){t.setCanvasSize()}))}));i.observe(e),this.resizeObserver=i,this.isObserving=!0},t.prototype.offResize=function(){var t=this.wrapper;this.resizeObserver&&(this.resizeObserver.unobserve(t),this.isObserving=!1)},t.prototype.setCanvasSize=function(){var t=+window.getComputedStyle(this.wrapper).width.replace("px",""),e=+window.getComputedStyle(this.wrapper).height.replace("px",""),i=window.devicePixelRatio;this.canvasWidth=t*this.scale*i,this.canvasHeight=e*this.scale*i,this.canvas.setAttribute("width",""+this.canvasWidth),this.canvas.setAttribute("height",""+this.canvasHeight),this.setLifeSize()},t}();const e={worldSize:[64,64],tickTime:50,backgroundColor:"#fff",unitColor:"rgba(222,80,50,1)"};var i,r=e.backgroundColor,n=e.unitColor,o=function(){function t(t,e,i){this.x=e,this.y=i,this.life=t}return Object.defineProperty(t.prototype,"life",{get:function(){return this.isLife},set:function(t){this.isLife=t,this.color=t?n:r},enumerable:!1,configurable:!0}),t}(),s=function(){function t(t,e){var i=t.worldSize,r=i[0],n=i[1];this.x=r,this.y=n,this.map=e,this.prevMap={},this.setMapList(Object.keys(this.map)),this.lifeCount=this.cntLifeDot()}return t.prototype.cntLifeDot=function(){return this.prevTrueMap.length},t.prototype.on=function(t){var e=this;return this.setMapList(t,(function(t){e.map[t].life=!0})),this},t.prototype.off=function(t){var e=this;return this.setMapList(t,(function(t){e.map[t].life=!1})),this},t.prototype.toggle=function(t){var e=this;return this.setMapList(t,(function(t){e.map[t].life=!e.map[t].life})),this},t.prototype.setMapList=function(t,e){var i="string"==typeof t?[t]:t;e&&i.forEach((function(t){e(t)})),this.setPrevMap(i)},t.prototype.setPrevMap=function(t){var e=this;t.forEach((function(t){e.prevMap[t]=e.map[t].life})),this.prevTrueMap=Object.keys(this.prevMap).filter((function(t){return e.map[t].life})),this.lifeCount=this.cntLifeDot()},t}(),a=(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),c=function(t){function e(e,i){var r=t.call(this,e,i)||this;return r.tick=e.tickTime,r.color=e.unitColor,r}return a(e,t),e.prototype.start=function(t){var e=this;void 0===this.interval&&(this.renderer=t,this.interval=setInterval((function(){console.time("interval"),e.update(),console.timeLog("interval"," :: to calc"),e.renderer.render(e.prevTrueMap),console.timeEnd("interval")}),this.tick))},e.prototype.stop=function(){clearInterval(this.interval),this.interval=void 0},e.prototype.cntIsLife=function(t){var e=this,i=0;return this.getNeighbor(t).forEach((function(t){e.prevMap[t]&&i++})),i},e.prototype.getNeighbor=function(t){var e=this,i=t.split("-").map((function(t){return+t})),r=i[0],n=i[1],o=function(t,i){return t*e.y+i};return[this.map[r-1+"-"+(n-1)+"-"+o(r-1,n-1)]?r-1+"-"+(n-1)+"-"+o(r-1,n-1):"",this.map[r-1+"-"+n+"-"+o(r-1,n)]?r-1+"-"+n+"-"+o(r-1,n):"",this.map[r-1+"-"+(n+1)+"-"+o(r-1,n+1)]?r-1+"-"+(n+1)+"-"+o(r-1,n+1):"",this.map[r+"-"+(n-1)+"-"+o(r,n-1)]?r+"-"+(n-1)+"-"+o(r,n-1):"",this.map[r+"-"+(n+1)+"-"+o(r,n+1)]?r+"-"+(n+1)+"-"+o(r,n+1):"",this.map[r+1+"-"+(n-1)+"-"+o(r+1,n-1)]?r+1+"-"+(n-1)+"-"+o(r+1,n-1):"",this.map[r+1+"-"+n+"-"+o(r+1,n)]?r+1+"-"+n+"-"+o(r+1,n):"",this.map[r+1+"-"+(n+1)+"-"+o(r+1,n+1)]?r+1+"-"+(n+1)+"-"+o(r+1,n+1):""].filter((function(t){return""!==t}))},e.prototype.getUpdateTarget=function(){var t=this;return Array.from(new Set(this.prevTrueMap.reduce((function(e,i){var r=t.getNeighbor(i);return e.concat(r)}),[]).concat(this.prevTrueMap)))},e.prototype.update=function(){var t=this,e=this.getUpdateTarget();return this.setMapList(e,(function(e){switch(t.cntIsLife(e)){case 2:!0===t.map[e].life?t.map[e].life=!0:t.map[e].life=!1;break;case 3:t.map[e].life=!0;break;default:t.map[e].life=!1}})),this},e}(s),p=e.worldSize,u=p[0],h=p[1],f=u*h;const l=function(t){var e=new Array(f).fill(1).reduce((function(t,e,i){var r=Math.floor(i/u),n=i%h,s=Math.round(10*Math.random())%2==0;return t[r+"-"+n+"-"+i]=new o(s,r,n),t}),{});return new c(t,e)};!function(){var i,r,n,o;i=this,r=void 0,o=function(){var i,r;return function(t,e){var i,r,n,o,s={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(i)throw new TypeError("Generator is already executing.");for(;s;)try{if(i=1,r&&(n=2&o[0]?r.return:o[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,o[1])).done)return n;switch(r=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!((n=(n=s.trys).length>0&&n[n.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){s.label=o[1];break}if(6===o[0]&&s.label<n[1]){s.label=n[1],n=o;break}if(n&&s.label<n[2]){s.label=n[2],s.ops.push(o);break}n[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(t){o=[6,t],r=0}finally{i=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}}(this,(function(n){return(i=e.worldSize)[0],i[1],r=document.querySelector("#wrapper"),window.world=l(e),window.renderer=new t(r,window.world),window.world.start(window.renderer),[2]}))},new((n=void 0)||(n=Promise))((function(t,e){function s(t){try{c(o.next(t))}catch(t){e(t)}}function a(t){try{c(o.throw(t))}catch(t){e(t)}}function c(e){var i;e.done?t(e.value):(i=e.value,i instanceof n?i:new n((function(t){t(i)}))).then(s,a)}c((o=o.apply(i,r||[])).next())}))}()})();