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

/***/ "./src/api/InitFn.ts":
/*!***************************!*\
  !*** ./src/api/InitFn.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getFirstList\": () => (/* binding */ getFirstList),\n/* harmony export */   \"getUpdateTarget\": () => (/* binding */ getUpdateTarget),\n/* harmony export */   \"getNeighbor\": () => (/* binding */ getNeighbor)\n/* harmony export */ });\nvar getFirstList = function (x, y) {\n    var size = x * y;\n    var cnt = 0;\n    var DOT_LIST = new Array(size).fill(1).reduce(function (acc, item, idx) {\n        var $x = Math.floor(idx / x);\n        var $y = idx % y;\n        var tf = Math.round(Math.random() * 10) % 2 === 0 ? true : false;\n        // const tf = cnt < 20 ? true : false;\n        if (tf)\n            cnt++;\n        acc[$x + \"-\" + $y] = tf;\n        return acc;\n    }, {});\n    return DOT_LIST;\n};\nvar getUpdateTarget = function (list) {\n    var keys = Object.keys(list);\n    return keys.reduce(function (acc, item) {\n        var arr = getNeighbor(item, list);\n        return acc.concat(arr);\n    }, []).concat(keys);\n    function getNeighbor(position, allMap) {\n        var _a = position.split('-').map(function (item) { return +item; }), y = _a[0], x = _a[1];\n        var value = [\n            allMap[y - 1 + \"-\" + (x - 1)] ? y - 1 + \"-\" + (x - 1) : '',\n            allMap[y - 1 + \"-\" + x] ? y - 1 + \"-\" + x : '',\n            allMap[y - 1 + \"-\" + (x + 1)] ? y - 1 + \"-\" + (x + 1) : '',\n            allMap[y + \"-\" + (x - 1)] ? y + \"-\" + (x - 1) : '',\n            allMap[y + \"-\" + (x + 1)] ? y + \"-\" + (x + 1) : '',\n            allMap[y + 1 + \"-\" + (x - 1)] ? y + 1 + \"-\" + (x - 1) : '',\n            allMap[y + 1 + \"-\" + x] ? y + 1 + \"-\" + x : '',\n            allMap[y + 1 + \"-\" + (x + 1)] ? y + 1 + \"-\" + (x + 1) : ''\n        ].filter(function (item) { return item !== ''; });\n        return value;\n    }\n};\nvar getNeighbor = function (position, allMap) {\n    var _a = position.split('-').map(function (item) { return +item; }), y = _a[0], x = _a[1];\n    var value = [\n        allMap[y - 1 + \"-\" + (x - 1)] ? y - 1 + \"-\" + (x - 1) : '',\n        allMap[y - 1 + \"-\" + x] ? y - 1 + \"-\" + x : '',\n        allMap[y - 1 + \"-\" + (x + 1)] ? y - 1 + \"-\" + (x + 1) : '',\n        allMap[y + \"-\" + (x - 1)] ? y + \"-\" + (x - 1) : '',\n        allMap[y + \"-\" + (x + 1)] ? y + \"-\" + (x + 1) : '',\n        allMap[y + 1 + \"-\" + (x - 1)] ? y + 1 + \"-\" + (x - 1) : '',\n        allMap[y + 1 + \"-\" + x] ? y + 1 + \"-\" + x : '',\n        allMap[y + 1 + \"-\" + (x + 1)] ? y + 1 + \"-\" + (x + 1) : ''\n    ].filter(function (item) { return item !== ''; });\n    return value;\n};\n\n\n//# sourceURL=webpack://world-431/./src/api/InitFn.ts?");

/***/ }),

/***/ "./src/api/worker/Worker.ts":
/*!**********************************!*\
  !*** ./src/api/worker/Worker.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createWorker\": () => (/* binding */ createWorker),\n/* harmony export */   \"initWorker\": () => (/* binding */ initWorker),\n/* harmony export */   \"balancing\": () => (/* binding */ balancing)\n/* harmony export */ });\nvar createWorker = function (fn) {\n    var fns = fn;\n    var isWorker = (Blob && URL && URL.createObjectURL) ? true : false;\n    if (isWorker) {\n        var blob = new Blob([\"onmessage = ({data}) => {\\n            postMessage((\" + fn + \")(data));\\n        }\"], { type: 'text/javascript' });\n        var url = URL.createObjectURL(blob);\n        var worker_1 = new Worker(url);\n        var resolve_1, reject_1;\n        worker_1.onmessage = function (_a) {\n            var data = _a.data;\n            resolve_1(data);\n        };\n        return function (data) { return new Promise(function (res, rej) {\n            resolve_1 = res;\n            reject_1 = rej;\n            worker_1.postMessage(data);\n        }); };\n    }\n    else {\n        return function (data) { return fn(data); };\n    }\n};\nvar initWorker = function (fn) {\n    var thread = navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 1;\n    var workers = new Array(thread).fill(0).map(function () { return createWorker(fn); });\n    return function (data) { return new Promise(function (res, rej) {\n        var datas = balancing(data);\n        var promises = workers.map(function (item, idx) { return item(datas[idx]); });\n        res(Promise.all(promises).then(function (data) { console.log(data); return data.flat(); }));\n    }); };\n};\nvar balancing = function (list) {\n    var thread = navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 1;\n    var entries = Array.isArray(list) ? list : Object.entries(list);\n    var cnt = thread;\n    var divLng = Math.floor(entries.length / cnt);\n    var am = entries.length % cnt;\n    var arr = [];\n    var idx = 0;\n    if (Array.isArray(list)) {\n        for (var i = 0; i < thread; i++) {\n            var num = divLng;\n            if (i < am)\n                num++;\n            arr.push(entries.slice(idx, idx + num));\n            idx += num;\n        }\n    }\n    else {\n        for (var i = 0; i < thread; i++) {\n            var num = divLng;\n            if (i < am)\n                num++;\n            arr.push(Object.fromEntries(entries.slice(idx, idx + num)));\n            idx += num;\n        }\n    }\n    return arr.filter(function (item) { return (Array.isArray(item) && item.length) || !Array.isArray(item); });\n};\n\n\n//# sourceURL=webpack://world-431/./src/api/worker/Worker.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _setting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setting */ \"./src/setting.ts\");\n/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style/style.scss */ \"./src/style/style.scss\");\n/* harmony import */ var _api_InitFn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api/InitFn */ \"./src/api/InitFn.ts\");\n/* harmony import */ var _api_worker_Worker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api/worker/Worker */ \"./src/api/worker/Worker.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\n\n\n\n\n(function () {\n    return __awaiter(this, void 0, void 0, function () {\n        var _a, x, y, size, wrap, list, trueList, worker;\n        return __generator(this, function (_b) {\n            switch (_b.label) {\n                case 0:\n                    _a = _setting__WEBPACK_IMPORTED_MODULE_0__[\"default\"].worldSize, x = _a[0], y = _a[1];\n                    size = x * y;\n                    wrap = document.querySelector('#wrapper');\n                    list = (0,_api_InitFn__WEBPACK_IMPORTED_MODULE_2__.getFirstList)(x, y);\n                    trueList = Object.keys(list).reduce(function (acc, item) {\n                        if (list[item]) {\n                            acc[item] = true;\n                        }\n                        return acc;\n                    }, {});\n                    worker = (0,_api_worker_Worker__WEBPACK_IMPORTED_MODULE_3__.initWorker)(_api_InitFn__WEBPACK_IMPORTED_MODULE_2__.getUpdateTarget);\n                    console.time('log start');\n                    return [4 /*yield*/, worker(trueList)];\n                case 1:\n                    _b.sent();\n                    console.timeEnd('log start');\n                    return [2 /*return*/];\n            }\n        });\n    });\n})();\n\n\n//# sourceURL=webpack://world-431/./src/main.ts?");

/***/ }),

/***/ "./src/setting.ts":
/*!************************!*\
  !*** ./src/setting.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar setting = {\n    worldSize: [512, 512],\n    tickTime: 50,\n    backgroundColor: '#fff',\n    unitColor: 'rgba(222,80,50,1)'\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setting);\n\n\n//# sourceURL=webpack://world-431/./src/setting.ts?");

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