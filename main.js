/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _screens_main_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./screens/main/main */ "./src/screens/main/main.js");


/***/ }),

/***/ "./src/screens/main/main.css":
/*!***********************************!*\
  !*** ./src/screens/main/main.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/screens/main/main.js":
/*!**********************************!*\
  !*** ./src/screens/main/main.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils.js");
/* harmony import */ var _main_template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.template */ "./src/screens/main/main.template.js");
/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main.css */ "./src/screens/main/main.css");
/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_main_css__WEBPACK_IMPORTED_MODULE_2__);



Object(_utils__WEBPACK_IMPORTED_MODULE_0__["inner"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('body'), _main_template__WEBPACK_IMPORTED_MODULE_1__["default"]);

Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.search-string').onblur = function () {
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.search-string').value = '';
};

Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.active-lang').onclick = function () {
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages').style.display = 'block';
};

Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.eng').onclick = function (event) {
  var target = event.target;
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["remove"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages'), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.eng'));
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages').insertBefore(target, Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages img'));
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.active-lang').src = './assets/ENG.png';
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages').style.display = 'none';
};

Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.bel').onclick = function (event) {
  var target = event.target;
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["remove"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages'), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.bel'));
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages').insertBefore(target, Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages img'));
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.active-lang').src = './assets/BEL.png';
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages').style.display = 'none';
};

Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.rus').onclick = function (event) {
  var target = event.target;
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["remove"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages'), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.rus'));
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages').insertBefore(target, Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages img'));
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.active-lang').src = './assets/RUS.png';
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages').style.display = 'none';
};

/***/ }),

/***/ "./src/screens/main/main.template.js":
/*!*******************************************!*\
  !*** ./src/screens/main/main.template.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n  <h1>Poets of Belarus</h1>\n  <section class=\"first-page\">\n    <div class=\"container\">\n      <img src=\"./assets/ENG.png\" alt=\"Language\" class=\"active-lang\">\n      <div class=\"languages\">\n        <img src=\"./assets/ENG.png\" alt=\"English language\" class=\"eng\">\n        <img src=\"./assets/BEL.png\" alt=\"Belarussian language\" class=\"bel\">\n        <img src=\"./assets/RUS.png\" alt=\"Russian language\" class=\"rus\">\n      </div>\n      <nav>\n          <a href=\"#\">List of poets</a>\n          <a href=\"#about-us\">About Us</a>\n          <a href=\"#author-of-the-day\">Author of the Day</a>\n          <a href=\"#\">Contacts</a>\n        </nav>\n      <img src=\"./assets/logo.png\" alt=\"Poets of Belarus\" class=\"logo\">\n      <div class=\"buttons-wrapper\">\n        <button class='main-button left'>List of poets</button>\n        <input type=\"text\" class='main-button search-string' placeholder=\"Search\">\n      </div>\n    </div>\n  </section>\n  <section class=\"second-page\">\n    <div class=\"container\">\n      <div class=\"backg-decor\"><img src=\"./assets/decor.png\"><img src=\"./assets/decor.png\"></div>\n      <div class=\"about-us\" id=\"about-us\">\n        <h2>About Us</h2>\n        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n          Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,\n          consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate\n          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt\n          mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.</p>\n      </div>\n      <div class=\"author-of-the-day\" id=\"author-of-the-day\">\n        <h2>Author of the Day</h2>\n        <img src=\"./assets/author-of-the-day.png\" alt=\"Jan Barszczewski\">\n        <blockquote>\xAB\u0427\u0430\u043B\u0430\u0432\u0435\u043A, \u044F\u043A\u0456 \u043D\u044F\u0437\u043C\u0435\u043D\u043D\u0430 \u0456\u0434\u0437\u0435 \u0434\u0430 \u043C\u044D\u0442\u044B, \u043D\u0435 \u0442\u043E\u043B\u044C\u043A\u0456 \u0437\u044F\u043C\u043B\u044E, \u0430\u043B\u0435 \u0456 \u0430\u0442\u043C\u0430\u0441\u0444\u0435\u0440\u0443 \u043C\u043E\u0436\u0430 \u0437\u043C\u044F\u043D\u0456\u0446\u044C\xBB</blockquote>\n        <cite><b>Jan Barzczewski</b><br> Nobleman Zawalnia, or Belarus in Fantastic Stories</cite>\n      </div>\n    </div>\n  </section>\n  <footer>\n    <div class=\"container\">\n      <hr>\n      <img src=\"./assets/logo-rsschool-4.svg\" alt=\"the Rolling Scopes School\" class=\"RSS-logo\" height=\"87\">\n      <img src=\"./assets/logo_rs_text.svg\" alt=\"the Rolling Scopes\" class=\"RS-logo\" height=\"87\">\n      <p>\n        <b>made by</b><br>\n        Nick Levkovich<br>\n        Katsiaryna Makarenka<br>\n        Kiryl Kireyeu<br><br>\n        Minsk, 2019\n      </p>\n    </div>\n  </footer>\n");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: $$, addAttr, addClass, append, create, getByClass, inner, pause, remove, setId, sleep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$$", function() { return $$; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addAttr", function() { return addAttr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append", function() { return append; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getByClass", function() { return getByClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inner", function() { return inner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pause", function() { return pause; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setId", function() { return setId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sleep", function() { return sleep; });
var $$ = function $$(el) {
  return document.querySelector(el);
};
var addAttr = function addAttr(el, attrs) {
  for (var name in attrs) {
    el.setAttribute(name, attrs[name]);
  }
};
var addClass = function addClass(el, className) {
  return el.classList.add(className), el;
};
var append = function append(parent, child) {
  return parent.appendChild(child), parent;
};
var create = function create(el) {
  return document.createElement(el);
};
var getByClass = function getByClass(el) {
  return document.getElementsByClassName(el);
};
var inner = function inner(el, text) {
  return el.innerHTML += text, el;
};
var pause = function pause(time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, time);
  });
};
var remove = function remove(parent, child) {
  return parent.removeChild(child), parent;
};
var setId = function setId(el, newId) {
  return el.id = newId, el;
};
var sleep = function sleep(milliseconds) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, milliseconds);
  });
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JlZW5zL21haW4vbWFpbi5jc3M/MzkxMyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyZWVucy9tYWluL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmVlbnMvbWFpbi9tYWluLnRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJpbm5lciIsIiQkIiwidGVtcGxhdGUiLCJvbmJsdXIiLCJ2YWx1ZSIsIm9uY2xpY2siLCJzdHlsZSIsImRpc3BsYXkiLCJldmVudCIsInRhcmdldCIsInJlbW92ZSIsImluc2VydEJlZm9yZSIsInNyYyIsImVsIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkQXR0ciIsImF0dHJzIiwibmFtZSIsInNldEF0dHJpYnV0ZSIsImFkZENsYXNzIiwiY2xhc3NOYW1lIiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kIiwicGFyZW50IiwiY2hpbGQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZSIsImNyZWF0ZUVsZW1lbnQiLCJnZXRCeUNsYXNzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInRleHQiLCJpbm5lckhUTUwiLCJwYXVzZSIsInRpbWUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiLCJyZW1vdmVDaGlsZCIsInNldElkIiwibmV3SWQiLCJpZCIsInNsZWVwIiwibWlsbGlzZWNvbmRzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFF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QUcsU0FBUkEsS0FBUSxDQUFDYSxFQUFELEVBQUttQixJQUFMO0FBQUEsU0FBZW5CLEVBQUUsQ0FBQ29CLFNBQUgsSUFBZ0JELElBQWhCLEVBQXNCbkIsRUFBckM7QUFBQSxDQUFkO0FBQ0EsSUFBTXFCLEtBQUssR0FBRyxTQUFSQSxLQUFRLENBQUFDLElBQUk7QUFBQSxTQUFJLElBQUlDLE9BQUosQ0FBWSxVQUFBQyxPQUFPLEVBQUk7QUFDbERDLGNBQVUsQ0FBQyxZQUFNO0FBQ2ZELGFBQU87QUFDUixLQUZTLEVBRVBGLElBRk8sQ0FBVjtBQUdELEdBSjRCLENBQUo7QUFBQSxDQUFsQjtBQUtBLElBQU16QixNQUFNLEdBQUcsU0FBVEEsTUFBUyxDQUFDZSxNQUFELEVBQVNDLEtBQVQ7QUFBQSxTQUFvQkQsTUFBTSxDQUFDYyxXQUFQLENBQW1CYixLQUFuQixHQUEyQkQsTUFBL0M7QUFBQSxDQUFmO0FBQ0EsSUFBTWUsS0FBSyxHQUFHLFNBQVJBLEtBQVEsQ0FBQzNCLEVBQUQsRUFBSzRCLEtBQUw7QUFBQSxTQUFnQjVCLEVBQUUsQ0FBQzZCLEVBQUgsR0FBUUQsS0FBUixFQUFlNUIsRUFBL0I7QUFBQSxDQUFkO0FBQ0EsSUFBTThCLEtBQUssR0FBRyxTQUFSQSxLQUFRLENBQUFDLFlBQVk7QUFBQSxTQUFJLElBQUlSLE9BQUosQ0FBWSxVQUFBQyxPQUFPO0FBQUEsV0FBSUMsVUFBVSxDQUFDRCxPQUFELEVBQVVPLFlBQVYsQ0FBZDtBQUFBLEdBQW5CLENBQUo7QUFBQSxDQUExQixDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCAnLi9zY3JlZW5zL21haW4vbWFpbic7IiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iLCJpbXBvcnQgeyAkJCwgaW5uZXIsIHJlbW92ZSB9IGZyb20gJy4uLy4uL3V0aWxzJztcclxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vbWFpbi50ZW1wbGF0ZSc7XHJcbmltcG9ydCAnLi9tYWluLmNzcyc7XHJcblxyXG5pbm5lcigkJCgnYm9keScpLCB0ZW1wbGF0ZSk7XHJcblxyXG4kJCgnLnNlYXJjaC1zdHJpbmcnKS5vbmJsdXIgPSAoKSA9PiB7XHJcbiAgJCQoJy5zZWFyY2gtc3RyaW5nJykudmFsdWUgPSAnJztcclxufVxyXG5cclxuJCQoJy5hY3RpdmUtbGFuZycpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgJCQoJy5sYW5ndWFnZXMnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxufTtcclxuXHJcbiQkKCcuZW5nJykub25jbGljayA9IGV2ZW50ID0+IHtcclxuICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgcmVtb3ZlKCQkKCcubGFuZ3VhZ2VzJyksICQkKCcuZW5nJykpO1xyXG4gICQkKCcubGFuZ3VhZ2VzJykuaW5zZXJ0QmVmb3JlKHRhcmdldCwgJCQoJy5sYW5ndWFnZXMgaW1nJykpO1xyXG4gICQkKCcuYWN0aXZlLWxhbmcnKS5zcmMgPSAnLi9hc3NldHMvRU5HLnBuZyc7XHJcbiAgJCQoJy5sYW5ndWFnZXMnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG59O1xyXG5cclxuJCQoJy5iZWwnKS5vbmNsaWNrID0gZXZlbnQgPT4ge1xyXG4gIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICByZW1vdmUoJCQoJy5sYW5ndWFnZXMnKSwgJCQoJy5iZWwnKSk7XHJcbiAgJCQoJy5sYW5ndWFnZXMnKS5pbnNlcnRCZWZvcmUodGFyZ2V0LCAkJCgnLmxhbmd1YWdlcyBpbWcnKSk7XHJcbiAgJCQoJy5hY3RpdmUtbGFuZycpLnNyYyA9ICcuL2Fzc2V0cy9CRUwucG5nJztcclxuICAkJCgnLmxhbmd1YWdlcycpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbn07XHJcblxyXG4kJCgnLnJ1cycpLm9uY2xpY2sgPSBldmVudCA9PiB7XHJcbiAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gIHJlbW92ZSgkJCgnLmxhbmd1YWdlcycpLCAkJCgnLnJ1cycpKTtcclxuICAkJCgnLmxhbmd1YWdlcycpLmluc2VydEJlZm9yZSh0YXJnZXQsICQkKCcubGFuZ3VhZ2VzIGltZycpKTtcclxuICAkJCgnLmFjdGl2ZS1sYW5nJykuc3JjID0gJy4vYXNzZXRzL1JVUy5wbmcnO1xyXG4gICQkKCcubGFuZ3VhZ2VzJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxufTsiLCJleHBvcnQgZGVmYXVsdCBgXHJcbiAgPGgxPlBvZXRzIG9mIEJlbGFydXM8L2gxPlxyXG4gIDxzZWN0aW9uIGNsYXNzPVwiZmlyc3QtcGFnZVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL0VORy5wbmdcIiBhbHQ9XCJMYW5ndWFnZVwiIGNsYXNzPVwiYWN0aXZlLWxhbmdcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImxhbmd1YWdlc1wiPlxyXG4gICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvRU5HLnBuZ1wiIGFsdD1cIkVuZ2xpc2ggbGFuZ3VhZ2VcIiBjbGFzcz1cImVuZ1wiPlxyXG4gICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvQkVMLnBuZ1wiIGFsdD1cIkJlbGFydXNzaWFuIGxhbmd1YWdlXCIgY2xhc3M9XCJiZWxcIj5cclxuICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL1JVUy5wbmdcIiBhbHQ9XCJSdXNzaWFuIGxhbmd1YWdlXCIgY2xhc3M9XCJydXNcIj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxuYXY+XHJcbiAgICAgICAgICA8YSBocmVmPVwiI1wiPkxpc3Qgb2YgcG9ldHM8L2E+XHJcbiAgICAgICAgICA8YSBocmVmPVwiI2Fib3V0LXVzXCI+QWJvdXQgVXM8L2E+XHJcbiAgICAgICAgICA8YSBocmVmPVwiI2F1dGhvci1vZi10aGUtZGF5XCI+QXV0aG9yIG9mIHRoZSBEYXk8L2E+XHJcbiAgICAgICAgICA8YSBocmVmPVwiI1wiPkNvbnRhY3RzPC9hPlxyXG4gICAgICAgIDwvbmF2PlxyXG4gICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL2xvZ28ucG5nXCIgYWx0PVwiUG9ldHMgb2YgQmVsYXJ1c1wiIGNsYXNzPVwibG9nb1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9ucy13cmFwcGVyXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz0nbWFpbi1idXR0b24gbGVmdCc+TGlzdCBvZiBwb2V0czwvYnV0dG9uPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPSdtYWluLWJ1dHRvbiBzZWFyY2gtc3RyaW5nJyBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvc2VjdGlvbj5cclxuICA8c2VjdGlvbiBjbGFzcz1cInNlY29uZC1wYWdlXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJiYWNrZy1kZWNvclwiPjxpbWcgc3JjPVwiLi9hc3NldHMvZGVjb3IucG5nXCI+PGltZyBzcmM9XCIuL2Fzc2V0cy9kZWNvci5wbmdcIj48L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImFib3V0LXVzXCIgaWQ9XCJhYm91dC11c1wiPlxyXG4gICAgICAgIDxoMj5BYm91dCBVczwvaDI+XHJcbiAgICAgICAgPHA+TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdCwgc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdWEuXHJcbiAgICAgICAgICBRdWlzIGlwc3VtIHN1c3BlbmRpc3NlIHVsdHJpY2VzIGdyYXZpZGEuIFJpc3VzIGNvbW1vZG8gdml2ZXJyYSBtYWVjZW5hcyBhY2N1bXNhbiBsYWN1cyB2ZWwgZmFjaWxpc2lzLiBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCxcclxuICAgICAgICAgIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLiBVdCBlbmltIGFkIG1pbmltIHZlbmlhbSxcclxuICAgICAgICAgIHF1aXMgbm9zdHJ1ZCBleGVyY2l0YXRpb24gdWxsYW1jbyBsYWJvcmlzIG5pc2kgdXQgYWxpcXVpcCBleCBlYSBjb21tb2RvIGNvbnNlcXVhdC4gRHVpcyBhdXRlIGlydXJlIGRvbG9yIGluIHJlcHJlaGVuZGVyaXQgaW4gdm9sdXB0YXRlXHJcbiAgICAgICAgICB2ZWxpdCBlc3NlIGNpbGx1bSBkb2xvcmUgZXUgZnVnaWF0IG51bGxhIHBhcmlhdHVyLiBFeGNlcHRldXIgc2ludCBvY2NhZWNhdCBjdXBpZGF0YXQgbm9uIHByb2lkZW50LCBzdW50IGluIGN1bHBhIHF1aSBvZmZpY2lhIGRlc2VydW50XHJcbiAgICAgICAgICBtb2xsaXQgYW5pbSBpZCBlc3QgbGFib3J1bS4gU2VkIHV0IHBlcnNwaWNpYXRpcyB1bmRlIG9tbmlzIGlzdGUgbmF0dXMgZXJyb3Igc2l0IHZvbHVwdGF0ZW0gYWNjdXNhbnRpdW0uPC9wPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImF1dGhvci1vZi10aGUtZGF5XCIgaWQ9XCJhdXRob3Itb2YtdGhlLWRheVwiPlxyXG4gICAgICAgIDxoMj5BdXRob3Igb2YgdGhlIERheTwvaDI+XHJcbiAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy9hdXRob3Itb2YtdGhlLWRheS5wbmdcIiBhbHQ9XCJKYW4gQmFyc3pjemV3c2tpXCI+XHJcbiAgICAgICAgPGJsb2NrcXVvdGU+wqvQp9Cw0LvQsNCy0LXQuiwg0Y/QutGWINC90Y/Qt9C80LXQvdC90LAg0ZbQtNC30LUg0LTQsCDQvNGN0YLRiywg0L3QtSDRgtC+0LvRjNC60ZYg0LfRj9C80LvRjiwg0LDQu9C1INGWINCw0YLQvNCw0YHRhNC10YDRgyDQvNC+0LbQsCDQt9C80Y/QvdGW0YbRjMK7PC9ibG9ja3F1b3RlPlxyXG4gICAgICAgIDxjaXRlPjxiPkphbiBCYXJ6Y3pld3NraTwvYj48YnI+IE5vYmxlbWFuIFphd2FsbmlhLCBvciBCZWxhcnVzIGluIEZhbnRhc3RpYyBTdG9yaWVzPC9jaXRlPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvc2VjdGlvbj5cclxuICA8Zm9vdGVyPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgICA8aHI+XHJcbiAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvbG9nby1yc3NjaG9vbC00LnN2Z1wiIGFsdD1cInRoZSBSb2xsaW5nIFNjb3BlcyBTY2hvb2xcIiBjbGFzcz1cIlJTUy1sb2dvXCIgaGVpZ2h0PVwiODdcIj5cclxuICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy9sb2dvX3JzX3RleHQuc3ZnXCIgYWx0PVwidGhlIFJvbGxpbmcgU2NvcGVzXCIgY2xhc3M9XCJSUy1sb2dvXCIgaGVpZ2h0PVwiODdcIj5cclxuICAgICAgPHA+XHJcbiAgICAgICAgPGI+bWFkZSBieTwvYj48YnI+XHJcbiAgICAgICAgTmljayBMZXZrb3ZpY2g8YnI+XHJcbiAgICAgICAgS2F0c2lhcnluYSBNYWthcmVua2E8YnI+XHJcbiAgICAgICAgS2lyeWwgS2lyZXlldTxicj48YnI+XHJcbiAgICAgICAgTWluc2ssIDIwMTlcclxuICAgICAgPC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9mb290ZXI+XHJcbmAiLCJleHBvcnQgY29uc3QgJCQgPSBlbCA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcclxuZXhwb3J0IGNvbnN0IGFkZEF0dHIgPSAoZWwsIGF0dHJzKSA9PiB7XHJcbiAgZm9yIChjb25zdCBuYW1lIGluIGF0dHJzKSB7XHJcbiAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgYXR0cnNbbmFtZV0pO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGFkZENsYXNzID0gKGVsLCBjbGFzc05hbWUpID0+IChlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSksIGVsKTtcclxuZXhwb3J0IGNvbnN0IGFwcGVuZCA9IChwYXJlbnQsIGNoaWxkKSA9PiAocGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKSwgcGFyZW50KTtcclxuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9IGVsID0+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwpO1xyXG5leHBvcnQgY29uc3QgZ2V0QnlDbGFzcyA9IGVsID0+IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoZWwpO1xyXG5leHBvcnQgY29uc3QgaW5uZXIgPSAoZWwsIHRleHQpID0+IChlbC5pbm5lckhUTUwgKz0gdGV4dCwgZWwpO1xyXG5leHBvcnQgY29uc3QgcGF1c2UgPSB0aW1lID0+IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgcmVzb2x2ZSgpO1xyXG4gIH0sIHRpbWUpO1xyXG59KTtcclxuZXhwb3J0IGNvbnN0IHJlbW92ZSA9IChwYXJlbnQsIGNoaWxkKSA9PiAocGFyZW50LnJlbW92ZUNoaWxkKGNoaWxkKSwgcGFyZW50KTtcclxuZXhwb3J0IGNvbnN0IHNldElkID0gKGVsLCBuZXdJZCkgPT4gKGVsLmlkID0gbmV3SWQsIGVsKTtcclxuZXhwb3J0IGNvbnN0IHNsZWVwID0gbWlsbGlzZWNvbmRzID0+IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtaWxsaXNlY29uZHMpKVxyXG4iXSwic291cmNlUm9vdCI6IiJ9