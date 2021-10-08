/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style/style.scss":
/*!******************************!*\
  !*** ./src/style/style.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://world-431/./src/style/style.scss?");

/***/ }),

/***/ "./src/api/Dot.ts":
/*!************************!*\
  !*** ./src/api/Dot.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Dot\": () => (/* binding */ Dot)\n/* harmony export */ });\n/* harmony import */ var _src_setting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/setting */ \"./src/setting.ts\");\n\nvar backgroundColor = _src_setting__WEBPACK_IMPORTED_MODULE_0__[\"default\"].backgroundColor, unitColor = _src_setting__WEBPACK_IMPORTED_MODULE_0__[\"default\"].unitColor;\nvar Dot = /** @class */ (function () {\n    function Dot(isLife, x, y) {\n        this.x = x;\n        this.y = y;\n        this.life = isLife;\n        this.wasLife = !isLife;\n    }\n    Object.defineProperty(Dot.prototype, \"life\", {\n        get: function () {\n            return this.isLife;\n        },\n        set: function (val) {\n            if (this.isLife !== val) {\n                this.wsLife = !this.wsLife;\n            }\n            this.isLife = val;\n            if (val) {\n                this.color = unitColor;\n            }\n            else {\n                this.color = backgroundColor;\n            }\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Dot.prototype, \"wasLife\", {\n        get: function () {\n            return this.wsLife;\n        },\n        set: function (val) {\n            this.wsLife = val;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    return Dot;\n}());\n\n\n\n//# sourceURL=webpack://world-431/./src/api/Dot.ts?");

/***/ }),

/***/ "./src/api/Grid.ts":
/*!*************************!*\
  !*** ./src/api/Grid.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Grid\": () => (/* binding */ Grid)\n/* harmony export */ });\nvar Grid = /** @class */ (function () {\n    function Grid(setting, map) {\n        var _a = setting.worldSize, x = _a[0], y = _a[1];\n        this.x = x;\n        this.y = y;\n        this.map = map;\n        this.prevMap = {};\n        this.setMapList(Object.keys(this.map));\n        this.lifeCount = this.cntLifeDot();\n    }\n    Grid.prototype.cntLifeDot = function () {\n        return this.prevTrueMap.length;\n    };\n    Grid.prototype.on = function (target) {\n        var _this = this;\n        this.setMapList(target, function (item) {\n            _this.map[item].life = true;\n        });\n        return this;\n    };\n    Grid.prototype.off = function (target) {\n        var _this = this;\n        this.setMapList(target, function (item) {\n            _this.map[item].life = false;\n        });\n        return this;\n    };\n    Grid.prototype.toggle = function (target) {\n        var _this = this;\n        this.setMapList(target, function (item) {\n            _this.map[item].life = !_this.map[item].life;\n        });\n        return this;\n    };\n    Grid.prototype.setMapList = function (target, cbk) {\n        var key = typeof target === 'string' ? [target] : target;\n        if (cbk) {\n            key.forEach(function (item) {\n                cbk(item);\n            });\n        }\n        this.setPrevMap(key);\n    };\n    Grid.prototype.setPrevMap = function (key) {\n        var _this = this;\n        key.forEach(function (item) {\n            _this.prevMap[item] = _this.map[item].life;\n        });\n        this.prevTrueMap = Object.keys(this.prevMap).filter(function (item) { return _this.map[item].life; });\n        this.lifeCount = this.cntLifeDot();\n    };\n    return Grid;\n}());\n\n\n\n//# sourceURL=webpack://world-431/./src/api/Grid.ts?");

/***/ }),

/***/ "./src/api/Renderer.ts":
/*!*****************************!*\
  !*** ./src/api/Renderer.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Renderer\": () => (/* binding */ Renderer)\n/* harmony export */ });\nvar Renderer = /** @class */ (function () {\n    function Renderer(wrapper, sim) {\n        this.wrapper = wrapper;\n        this.isObserving = false;\n        this.world = sim;\n        this.scale = 4;\n        this.prevMap = [];\n        this.resizing = false;\n        this.initCanvas();\n        this.onResize();\n    }\n    Renderer.prototype.initCanvas = function () {\n        this.canvas = document.createElement('canvas');\n        this.canvas.style.width = '100vmin';\n        this.canvas.style.height = '100vmin';\n        this.canvas.style.imageRendering = 'pixelated';\n        this.ctx = this.canvas.getContext('2d');\n        this.ctx.fillStyle = this.world.color;\n        // this.setCanvasSize();\n        this.wrapper.append(this.canvas);\n    };\n    Renderer.prototype.render = function (map, reset) {\n        var _this = this;\n        if (reset === void 0) { reset = false; }\n        if (this.resizing && !reset)\n            return;\n        var _a = this.diff(reset ? [] : this.prevMap, map), on = _a[0], off = _a[1];\n        on.forEach(function (item) {\n            var _a = item.split('-'), y = _a[0], x = _a[1];\n            _this.draw(+x, +y);\n        });\n        off.forEach(function (item) {\n            var _a = item.split('-'), y = _a[0], x = _a[1];\n            _this.erase(+x, +y);\n        });\n        this.prevMap = map;\n    };\n    Renderer.prototype.diff = function (a, b) {\n        var onList = b.filter(function (item) { return !a.includes(item); });\n        var offList = a.filter(function (item) { return !b.includes(item); });\n        return [onList, offList];\n    };\n    Renderer.prototype.draw = function (x, y) {\n        var sz = this.lifeSize;\n        this.ctx.fillRect(x * sz, y * sz, sz, sz);\n    };\n    Renderer.prototype.erase = function (x, y) {\n        // const offset = 0.5;\n        var sz = this.lifeSize;\n        this.ctx.clearRect(x * sz, y * sz, sz, sz);\n    };\n    Renderer.prototype.setLifeSize = function () {\n        var w = +window.getComputedStyle(this.wrapper).width.replace('px', '');\n        this.lifeSize = 1;\n    };\n    Renderer.prototype.onResize = function () {\n        var _this = this;\n        var target = this.wrapper;\n        var obs = new ResizeObserver(function () {\n            requestAnimationFrame(function () {\n                _this.resizing = true;\n                _this.setCanvasSize();\n                _this.render(_this.world.prevTrueMap, true);\n                _this.resizing = false;\n            });\n        });\n        obs.observe(target);\n        this.resizeObserver = obs;\n        this.isObserving = true;\n    };\n    Renderer.prototype.offResize = function () {\n        var target = this.wrapper;\n        if (this.resizeObserver) {\n            this.resizeObserver.unobserve(target);\n            this.isObserving = false;\n        }\n    };\n    Renderer.prototype.setCanvasSize = function () {\n        var w = +window.getComputedStyle(this.wrapper).width.replace('px', '');\n        var h = +window.getComputedStyle(this.wrapper).height.replace('px', '');\n        // const pixelRatio  = window.devicePixelRatio;\n        // this.canvasWidth  = w*this.scale*pixelRatio;\n        // this.canvasHeight = h*this.scale*pixelRatio;\n        this.canvas.setAttribute('width', \"\" + this.world.x);\n        this.canvas.setAttribute('height', \"\" + this.world.y);\n        // this.canvas.setAttribute('width', \"\"+this.canvasWidth);\n        // this.canvas.setAttribute('height', \"\"+this.canvasHeight);\n        this.setLifeSize();\n    };\n    return Renderer;\n}());\n\n\n\n//# sourceURL=webpack://world-431/./src/api/Renderer.ts?");

/***/ }),

/***/ "./src/api/Simulator.ts":
/*!******************************!*\
  !*** ./src/api/Simulator.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Simulator\": () => (/* binding */ Simulator)\n/* harmony export */ });\n/* harmony import */ var _Grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Grid */ \"./src/api/Grid.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar Simulator = /** @class */ (function (_super) {\n    __extends(Simulator, _super);\n    function Simulator(setting, map) {\n        var _this = _super.call(this, setting, map) || this;\n        _this.tick = setting.tickTime;\n        _this.color = setting.unitColor;\n        return _this;\n    }\n    Simulator.prototype.start = function (renderer) {\n        var _this = this;\n        if (this.interval !== undefined)\n            return;\n        this.renderer = renderer;\n        // this.renderer.start();\n        this.interval = setInterval(function () {\n            console.time('interval');\n            _this.update();\n            console.timeLog('interval', ' :: to calc');\n            _this.renderer.render(_this.prevTrueMap);\n            console.timeEnd('interval');\n        }, this.tick);\n    };\n    Simulator.prototype.stop = function () {\n        clearInterval(this.interval);\n        // this.renderer.stop();\n        this.interval = undefined;\n    };\n    Simulator.prototype.cntIsLife = function (position) {\n        var _this = this;\n        var cnt = 0;\n        var neighbor = this.getNeighbor(position);\n        // console.log('neighbor ::',neighbor);\n        neighbor.forEach(function (item) {\n            if (_this.prevMap[item])\n                cnt++;\n        });\n        return cnt;\n    };\n    Simulator.prototype.updateDot = function (position, dot) {\n        var cnt = this.cntIsLife(position);\n        var dotWasList = dot.life;\n    };\n    Simulator.prototype.getNeighbor = function (position) {\n        var _this = this;\n        var _a = position.split('-').map(function (item) { return +item; }), y = _a[0], x = _a[1];\n        var index = function (y, x) {\n            return (y * _this.y) + x;\n        };\n        var value = [\n            this.map[y - 1 + \"-\" + (x - 1) + \"-\" + index(y - 1, x - 1)] ? y - 1 + \"-\" + (x - 1) + \"-\" + index(y - 1, x - 1) : '',\n            this.map[y - 1 + \"-\" + x + \"-\" + index(y - 1, x)] ? y - 1 + \"-\" + x + \"-\" + index(y - 1, x) : '',\n            this.map[y - 1 + \"-\" + (x + 1) + \"-\" + index(y - 1, x + 1)] ? y - 1 + \"-\" + (x + 1) + \"-\" + index(y - 1, x + 1) : '',\n            this.map[y + \"-\" + (x - 1) + \"-\" + index(y, x - 1)] ? y + \"-\" + (x - 1) + \"-\" + index(y, x - 1) : '',\n            this.map[y + \"-\" + (x + 1) + \"-\" + index(y, x + 1)] ? y + \"-\" + (x + 1) + \"-\" + index(y, x + 1) : '',\n            this.map[y + 1 + \"-\" + (x - 1) + \"-\" + index(y + 1, x - 1)] ? y + 1 + \"-\" + (x - 1) + \"-\" + index(y + 1, x - 1) : '',\n            this.map[y + 1 + \"-\" + x + \"-\" + index(y + 1, x)] ? y + 1 + \"-\" + x + \"-\" + index(y + 1, x) : '',\n            this.map[y + 1 + \"-\" + (x + 1) + \"-\" + index(y + 1, x + 1)] ? y + 1 + \"-\" + (x + 1) + \"-\" + index(y + 1, x + 1) : ''\n        ].filter(function (item) { return item !== ''; });\n        return value;\n    };\n    Simulator.prototype.getUpdateTarget = function () {\n        var _this = this;\n        return Array.from(new Set(this.prevTrueMap.reduce(function (acc, item) {\n            var arr = _this.getNeighbor(item);\n            return acc.concat(arr);\n        }, []).concat(this.prevTrueMap)));\n    };\n    Simulator.prototype.update = function () {\n        var _this = this;\n        var updateTarget = this.getUpdateTarget();\n        // updateTarget.forEach((item:string) => {\n        //     this.updateDot(item, this.map[item]);\n        // });\n        // console.log(this.prevMap);\n        this.setMapList(updateTarget, function (item) {\n            var cnt = _this.cntIsLife(item);\n            switch (cnt) {\n                case 2:\n                    if (_this.map[item].life === true) {\n                        // console.log(item, cnt, this.map[item].life, 'true');\n                        _this.map[item].life = true;\n                    }\n                    else {\n                        // console.log(item, cnt, this.map[item].life, 'false');\n                        _this.map[item].life = false;\n                    }\n                    break;\n                case 3:\n                    // console.log(item, cnt, this.map[item].life, 'true');\n                    _this.map[item].life = true;\n                    break;\n                default:\n                    // console.log(item, cnt, this.map[item].life, 'false');\n                    _this.map[item].life = false;\n            }\n        });\n        return this;\n    };\n    return Simulator;\n}(_Grid__WEBPACK_IMPORTED_MODULE_0__.Grid));\n\n\n\n//# sourceURL=webpack://world-431/./src/api/Simulator.ts?");

/***/ }),

/***/ "./src/init.ts":
/*!*********************!*\
  !*** ./src/init.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _api_Dot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api/Dot */ \"./src/api/Dot.ts\");\n/* harmony import */ var _src_setting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @src/setting */ \"./src/setting.ts\");\n/* harmony import */ var _api_Simulator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api/Simulator */ \"./src/api/Simulator.ts\");\n\n\n\nvar _a = _src_setting__WEBPACK_IMPORTED_MODULE_1__[\"default\"].worldSize, x = _a[0], y = _a[1];\nvar size = x * y;\n/**\n * @description 초기 설정 함수\n * @param {Object} setting - ./src/setting.ts 에 정의된 설정값\n * @param {Array<number>} worldSize - 월드의 크기\n * @param {number} tickTime - 월드 갱신 주기 (ms)\n */\nvar init = function (setting) {\n    var cnt = 0;\n    var list = new Array(size).fill(1).reduce(function (acc, item, idx) {\n        var $x = Math.floor(idx / x);\n        var $y = idx % y;\n        // const tf = Math.round(Math.random()*10)%2 === 0 && cnt < 20 ? true : false;\n        var tf = Math.round(Math.random() * 10) % 2 === 0 ? true : false;\n        // const tf = cnt < 20 ? true : false;\n        // const tf = false;\n        // const tf = idx < 3 ? true : false;\n        if (tf)\n            cnt++;\n        acc[$x + \"-\" + $y + \"-\" + idx] = new _api_Dot__WEBPACK_IMPORTED_MODULE_0__.Dot(tf, $x, $y);\n        return acc;\n    }, {});\n    var grid = new _api_Simulator__WEBPACK_IMPORTED_MODULE_2__.Simulator(setting, list);\n    return grid;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (init);\n\n\n//# sourceURL=webpack://world-431/./src/init.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./init */ \"./src/init.ts\");\n/* harmony import */ var _api_Renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api/Renderer */ \"./src/api/Renderer.ts\");\n/* harmony import */ var _setting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setting */ \"./src/setting.ts\");\n/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style/style.scss */ \"./src/style/style.scss\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\n\n\n\n\n// import { getFirstList, getUpdateTarget } from './api/InitFn';\n// import { initWorker }   from './api/worker/Worker';\n(function () {\n    return __awaiter(this, void 0, void 0, function () {\n        var _a, x, y, size, wrap;\n        return __generator(this, function (_b) {\n            _a = _setting__WEBPACK_IMPORTED_MODULE_2__[\"default\"].worldSize, x = _a[0], y = _a[1];\n            size = x * y;\n            wrap = document.querySelector('#wrapper');\n            window.world = (0,_init__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_setting__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n            window.renderer = new _api_Renderer__WEBPACK_IMPORTED_MODULE_1__.Renderer(wrap, window.world);\n            window.world.start(window.renderer);\n            return [2 /*return*/];\n        });\n    });\n})();\n\n\n//# sourceURL=webpack://world-431/./src/main.ts?");

/***/ }),

/***/ "./src/setting.ts":
/*!************************!*\
  !*** ./src/setting.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar setting = {\n    worldSize: [128, 128],\n    tickTime: 50,\n    backgroundColor: '#fff',\n    unitColor: 'rgba(222,80,50,1)'\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setting);\n\n\n//# sourceURL=webpack://world-431/./src/setting.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;