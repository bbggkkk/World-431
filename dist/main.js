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

/***/ "./src/api/Demo.ts":
/*!*************************!*\
  !*** ./src/api/Demo.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Demo\": () => (/* binding */ Demo)\n/* harmony export */ });\n/* harmony import */ var _src_setting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/setting */ \"./src/setting.ts\");\n\nvar Demo = /** @class */ (function () {\n    function Demo(wrapper) {\n        this.wrapper = wrapper;\n        this.children = this.wrapper.querySelectorAll(':scope > div');\n        var _a = _src_setting__WEBPACK_IMPORTED_MODULE_0__[\"default\"].worldSize, x = _a[0], y = _a[1];\n        this.wrapper.style.gridTemplate = \"repeat(\" + x + \",\" + 100 / x + \"%)/repeat(\" + y + \",\" + 100 / y + \"%)\";\n    }\n    Demo.prototype.render = function (sim) {\n        var _this = this;\n        var mp = sim.map;\n        var wd = sim.prevMap;\n        Object.keys(wd).forEach(function (item) {\n            var ele = _this.wrapper.querySelector(\"[data-idx=\\\"\" + item + \"\\\"]\");\n            if (wd[item]) {\n                ele.style.backgroundColor = mp[item].color;\n            }\n            else {\n                ele.style.backgroundColor = mp[item].color;\n            }\n        });\n    };\n    Demo.prototype.start = function () {\n        this.wrapper.classList.add('start');\n        // this.children.forEach((item:Node) => (item as HTMLElement).style.border = '1px solid #ccc')\n    };\n    Demo.prototype.stop = function () {\n        this.wrapper.classList.remove('start');\n        // this.children.forEach((item:Node) => (item as HTMLElement).style.border = 'none')\n    };\n    return Demo;\n}());\n\n\n\n//# sourceURL=webpack://world-431/./src/api/Demo.ts?");

/***/ }),

/***/ "./src/api/Dot.ts":
/*!************************!*\
  !*** ./src/api/Dot.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Dot\": () => (/* binding */ Dot)\n/* harmony export */ });\n/* harmony import */ var _src_setting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/setting */ \"./src/setting.ts\");\n\nvar backgroundColor = _src_setting__WEBPACK_IMPORTED_MODULE_0__[\"default\"].backgroundColor, unitColor = _src_setting__WEBPACK_IMPORTED_MODULE_0__[\"default\"].unitColor;\nvar Dot = /** @class */ (function () {\n    function Dot(isLife, x, y) {\n        this.x = x;\n        this.y = y;\n        this.life = isLife;\n    }\n    Object.defineProperty(Dot.prototype, \"life\", {\n        get: function () {\n            return this.isLife;\n        },\n        set: function (val) {\n            this.isLife = val;\n            if (val) {\n                this.color = unitColor;\n            }\n            else {\n                this.color = backgroundColor;\n            }\n        },\n        enumerable: false,\n        configurable: true\n    });\n    return Dot;\n}());\n\n\n\n//# sourceURL=webpack://world-431/./src/api/Dot.ts?");

/***/ }),

/***/ "./src/api/Grid.ts":
/*!*************************!*\
  !*** ./src/api/Grid.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Grid\": () => (/* binding */ Grid)\n/* harmony export */ });\nvar Grid = /** @class */ (function () {\n    function Grid(setting, map) {\n        var _a = setting.worldSize, x = _a[0], y = _a[1];\n        this.x = x;\n        this.y = y;\n        this.map = map;\n        this.prevMap = {};\n        this.setMapList(Object.keys(this.map));\n        this.lifeCount = this.cntLifeDot();\n        // this.defineEvent();\n    }\n    // defineEvent() {\n    //     Object.keys(this.map).forEach((item:string) => {\n    //         console.log(this.map,item,this.map[item]);\n    //         const key:string = item;\n    //         this.map[item].addEventListener('click',this.onoff)\n    //     });\n    // }\n    // onoff(){\n    //     console.log(this);\n    // }\n    Grid.prototype.cntLifeDot = function () {\n        return Object.keys(this.prevTrueMap).length;\n    };\n    Grid.prototype.on = function (target) {\n        var _this = this;\n        this.setMapList(target, function (item) {\n            _this.map[item].life = true;\n        });\n        return this;\n    };\n    Grid.prototype.off = function (target) {\n        var _this = this;\n        this.setMapList(target, function (item) {\n            _this.map[item].life = false;\n        });\n        return this;\n    };\n    Grid.prototype.toggle = function (target) {\n        var _this = this;\n        this.setMapList(target, function (item) {\n            _this.map[item].life = !_this.map[item].life;\n        });\n        return this;\n    };\n    Grid.prototype.setMapList = function (target, cbk) {\n        var key = typeof target === 'string' ? [target] : target;\n        if (cbk) {\n            key.forEach(function (item) {\n                cbk(item);\n            });\n        }\n        // console.log(key);\n        //렌더링\n        this.setPrevMap(key);\n    };\n    Grid.prototype.setPrevMap = function (key) {\n        var _this = this;\n        key.forEach(function (item) {\n            _this.prevMap[item] = _this.map[item].life;\n        });\n        this.prevTrueMap = Object.keys(this.prevMap).filter(function (item) { return _this.map[item].life; }).reduce(function (acc, item) {\n            acc[item] = _this.map[item];\n            return acc;\n        }, {});\n        // console.log(this.prevMap);\n        // this.prevTrueMap = {};\n        // key.forEach(item => {\n        //     this.prevMap[item] = this.map[item].life;\n        //     if(this.map[item].life){\n        //         this.prevTrueMap[item] = true;\n        //     }\n        // });\n        this.lifeCount = this.cntLifeDot();\n    };\n    return Grid;\n}());\n\n\n\n//# sourceURL=webpack://world-431/./src/api/Grid.ts?");

/***/ }),

/***/ "./src/api/Simulator.ts":
/*!******************************!*\
  !*** ./src/api/Simulator.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Simulator\": () => (/* binding */ Simulator)\n/* harmony export */ });\n/* harmony import */ var _Grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Grid */ \"./src/api/Grid.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar Simulator = /** @class */ (function (_super) {\n    __extends(Simulator, _super);\n    function Simulator(setting, map) {\n        var _this = _super.call(this, setting, map) || this;\n        _this.tick = setting.tickTime;\n        return _this;\n        // this.worker = new MainTread({\n        //     start : this.start,\n        //     stop  : this.stop,\n        //     cntIsLife : this.cntIsLife,\n        //     getNeighbor : this.getNeighbor,\n        //     getUpdateTarget : this.getUpdateTarget,\n        //     update : this.update,\n        //     cntLifeDot : this.cntLifeDot,\n        //     on : this.on,\n        //     off : this.off,\n        //     toggle : this.toggle,\n        //     setMapList : this.setMapList,\n        //     setPrevMap : this.setPrevMap,\n        // },{\n        //     x : this.x,\n        //     y : this.y,\n        //     map : this.map,\n        //     prevMap : this.prevMap,\n        //     prevTrueMap : this.prevTrueMap,\n        //     lifeCount : this.lifeCount,\n        //     interval : this.interval,\n        //     renderer : this.renderer,\n        //     tick : this.tick,\n        // });\n        // this.thread = this.worker.$thread;\n    }\n    Simulator.prototype.start = function (demo) {\n        var _this = this;\n        if (this.interval !== undefined)\n            return;\n        this.renderer = demo;\n        this.renderer.start();\n        this.interval = setInterval(function () {\n            console.time('interval');\n            _this.update();\n            // this.renderer.render(this); \n            console.timeEnd('interval');\n        }, this.tick);\n    };\n    Simulator.prototype.stop = function () {\n        clearInterval(this.interval);\n        this.renderer.stop();\n        this.interval = undefined;\n    };\n    Simulator.prototype.cntIsLife = function (position) {\n        var _this = this;\n        var cnt = 0;\n        var neighbor = this.getNeighbor(position);\n        // console.log('neighbor ::',neighbor);\n        neighbor.forEach(function (item) {\n            if (_this.prevMap[item])\n                cnt++;\n        });\n        return cnt;\n    };\n    Simulator.prototype.getNeighbor = function (position) {\n        var _this = this;\n        var _a = position.split('-').map(function (item) { return +item; }), y = _a[0], x = _a[1];\n        var index = function (y, x) {\n            return (y * _this.y) + x;\n        };\n        var value = [\n            this.map[y - 1 + \"-\" + (x - 1) + \"-\" + index(y - 1, x - 1)] ? y - 1 + \"-\" + (x - 1) + \"-\" + index(y - 1, x - 1) : '',\n            this.map[y - 1 + \"-\" + x + \"-\" + index(y - 1, x)] ? y - 1 + \"-\" + x + \"-\" + index(y - 1, x) : '',\n            this.map[y - 1 + \"-\" + (x + 1) + \"-\" + index(y - 1, x + 1)] ? y - 1 + \"-\" + (x + 1) + \"-\" + index(y - 1, x + 1) : '',\n            this.map[y + \"-\" + (x - 1) + \"-\" + index(y, x - 1)] ? y + \"-\" + (x - 1) + \"-\" + index(y, x - 1) : '',\n            this.map[y + \"-\" + (x + 1) + \"-\" + index(y, x + 1)] ? y + \"-\" + (x + 1) + \"-\" + index(y, x + 1) : '',\n            this.map[y + 1 + \"-\" + (x - 1) + \"-\" + index(y + 1, x - 1)] ? y + 1 + \"-\" + (x - 1) + \"-\" + index(y + 1, x - 1) : '',\n            this.map[y + 1 + \"-\" + x + \"-\" + index(y + 1, x)] ? y + 1 + \"-\" + x + \"-\" + index(y + 1, x) : '',\n            this.map[y + 1 + \"-\" + (x + 1) + \"-\" + index(y + 1, x + 1)] ? y + 1 + \"-\" + (x + 1) + \"-\" + index(y + 1, x + 1) : ''\n        ].filter(function (item) { return item !== ''; });\n        return value;\n    };\n    Simulator.prototype.getUpdateTarget = function () {\n        var _this = this;\n        return Array.from(new Set(Object.keys(this.prevTrueMap).reduce(function (acc, item) {\n            var arr = _this.getNeighbor(item);\n            return acc.concat(arr);\n        }, []).concat(Object.keys(this.prevTrueMap))));\n    };\n    Simulator.prototype.update = function () {\n        var _this = this;\n        // const updateTarget:Array<string> = this.worker.$run('getUpdateTarget',Object.keys(this.prevTrueMap));\n        var updateTarget = this.getUpdateTarget();\n        // console.log(this.prevMap);\n        this.setMapList(updateTarget, function (item) {\n            var cnt = _this.cntIsLife(item);\n            switch (cnt) {\n                case 2:\n                    if (_this.map[item].life === true) {\n                        // console.log(item, cnt, this.map[item].life, 'true');\n                        _this.map[item].life = true;\n                    }\n                    else {\n                        // console.log(item, cnt, this.map[item].life, 'false');\n                        _this.map[item].life = false;\n                    }\n                    break;\n                case 3:\n                    // console.log(item, cnt, this.map[item].life, 'true');\n                    _this.map[item].life = true;\n                    break;\n                default:\n                    // console.log(item, cnt, this.map[item].life, 'false');\n                    _this.map[item].life = false;\n            }\n        });\n        return this;\n    };\n    return Simulator;\n}(_Grid__WEBPACK_IMPORTED_MODULE_0__.Grid));\n\n\n\n//# sourceURL=webpack://world-431/./src/api/Simulator.ts?");

/***/ }),

/***/ "./src/init.ts":
/*!*********************!*\
  !*** ./src/init.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _api_Dot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api/Dot */ \"./src/api/Dot.ts\");\n/* harmony import */ var _src_setting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @src/setting */ \"./src/setting.ts\");\n/* harmony import */ var _api_Simulator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api/Simulator */ \"./src/api/Simulator.ts\");\n\n\n\nvar _a = _src_setting__WEBPACK_IMPORTED_MODULE_1__[\"default\"].worldSize, x = _a[0], y = _a[1];\nvar size = x * y;\n/**\n * @description 초기 설정 함수\n * @param {Object} setting - ./src/setting.ts 에 정의된 설정값\n * @param {Array<number>} worldSize - 월드의 크기\n * @param {number} tickTime - 월드 갱신 주기 (ms)\n */\nvar init = function (setting) {\n    var cnt = 0;\n    var list = new Array(size).fill(1).reduce(function (acc, item, idx) {\n        var $x = Math.floor(idx / x);\n        var $y = idx % y;\n        var tf = Math.round(Math.random() * 10) % 2 === 0 && cnt < 120 ? true : false;\n        // const tf = Math.round(Math.random()*10)%2 === 0 ? true : false;\n        // const tf = cnt < 20 ? true : false;\n        // const tf = false;\n        // const tf = idx < 3 ? true : false;\n        if (tf)\n            cnt++;\n        acc[$x + \"-\" + $y + \"-\" + idx] = new _api_Dot__WEBPACK_IMPORTED_MODULE_0__.Dot(tf, $x, $y);\n        return acc;\n    }, {});\n    var grid = new _api_Simulator__WEBPACK_IMPORTED_MODULE_2__.Simulator(setting, list);\n    return grid;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (init);\n\n\n//# sourceURL=webpack://world-431/./src/init.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_Demo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api/Demo */ \"./src/api/Demo.ts\");\n/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./init */ \"./src/init.ts\");\n/* harmony import */ var _setting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setting */ \"./src/setting.ts\");\n/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style/style.scss */ \"./src/style/style.scss\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\n\n\n\n\n(function () {\n    return __awaiter(this, void 0, void 0, function () {\n        var _a, x, y, size, wrap;\n        return __generator(this, function (_b) {\n            _a = _setting__WEBPACK_IMPORTED_MODULE_2__[\"default\"].worldSize, x = _a[0], y = _a[1];\n            size = x * y;\n            wrap = document.querySelector('#wrapper');\n            window.world = (0,_init__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_setting__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n            window.demo = new _api_Demo__WEBPACK_IMPORTED_MODULE_0__.Demo(wrap);\n            // for(let i=0; i<size; i++){\n            //     const $x = Math.floor(i/x);\n            //     const $y = i%y;\n            //     const tmp = document.createElement('div');\n            //     tmp.setAttribute('data-idx',`${$x}-${$y}-${i}`);\n            //     tmp.addEventListener('click',() => { window.world.toggle(`${$x}-${$y}-${i}`); window.demo.render(window.world); } );\n            //     wrap?.append(tmp);\n            // }\n            window.demo.render(window.world);\n            window.world.start();\n            return [2 /*return*/];\n        });\n    });\n})();\n\n\n//# sourceURL=webpack://world-431/./src/main.ts?");

/***/ }),

/***/ "./src/setting.ts":
/*!************************!*\
  !*** ./src/setting.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar setting = {\n    worldSize: [1024, 1024],\n    tickTime: 1000,\n    backgroundColor: '#fff',\n    unitColor: 'rgba(222,80,50,1)'\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setting);\n\n\n//# sourceURL=webpack://world-431/./src/setting.ts?");

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