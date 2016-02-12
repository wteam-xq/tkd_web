/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// 前端脚本
	$(function(){
	  __webpack_require__(1);
	  // 公用变量
	  var $main_menu = $('#mainmenu'),
	  	  Client = __webpack_require__(5);
	  var loadingImg = __webpack_require__(6);
	  	  
	  // 初始化函数
	  init();
	  // 初始化
	  function init(){
	  	var browser = null,
	        $noCanvasTips = $('#noCanvasTips');
	    var _loadImg = document.createElement('img');
	    // 低版本浏览器时出现提示
	    browser = Client.browser;
	  	// 引入图片
	    _loadImg.src = loadingImg;
	    $noCanvasTips.find('.tkd-thumbnail').append(_loadImg);
	    $noCanvasTips.show();
	    if(browser.ie && parseInt(browser.ver, 10) < 9){
	      $noCanvasTips.show();
	    }
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./main.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./main.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".noCanvasTips{ display: none; }\n.tkd-thumbnail{ text-align: center; }", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	var client = function() {
	    //呈现引擎
	    var engine = {
	        ie: 0,
	        gecko: 0,
	        webkit: 0,
	        khtml: 0,
	        opera: 0,
	        //完整的版本号
	        ver: null
	    };
	    //浏览器
	    var browser = {
	        //主要浏览器
	        ie: 0,
	        firefox: 0,
	        safari: 0,
	        konq: 0,
	        opera: 0,
	        chrome: 0,
	        //具体的版本号
	        ver: null
	    };
	    //平台、设备和操作系统
	    var system = {
	        win: false,
	        mac: false,
	        x11: false,
	        //移动设备
	        iphone: false,
	        ipod: false,
	        ipad: false,
	        ios: false,
	        android: false,
	        nokiaN: false,
	        winMobile: false,
	        //游戏系统
	        wii: false,
	        ps: false
	    };
	    //检测呈现引擎和浏览器
	    var ua = navigator.userAgent;
	    if (window.opera) {
	        engine.ver = browser.ver = window.opera.version();
	        engine.opera = browser.opera = parseFloat(engine.ver);
	    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
	        engine.ver = RegExp["$1"];
	        engine.webkit = parseFloat(engine.ver);
	        //确定是 Chrome 还是 Safari
	        if (/Chrome\/(\S+)/.test(ua)) {
	            browser.ver = RegExp["$1"];
	            browser.chrome = parseFloat(browser.ver);
	        } else if (/Version\/(\S+)/.test(ua)) {
	            browser.ver = RegExp["$1"];
	            browser.safari = parseFloat(browser.ver);
	        } else {
	            //近似地确定版本号
	            var safariVersion = 1;
	            if (engine.webkit < 100) {
	                safariVersion = 1;
	            } else if (engine.webkit < 312) {
	                safariVersion = 1.2;
	            } else if (engine.webkit < 412) {
	                safariVersion = 1.3;
	            } else {
	                safariVersion = 2;
	            }
	            browser.safari = browser.ver = safariVersion;
	        }
	    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
	        engine.ver = browser.ver = RegExp["$1"];
	        engine.khtml = browser.konq = parseFloat(engine.ver);
	    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
	        engine.ver = RegExp["$1"];
	        engine.gecko = parseFloat(engine.ver);
	        //确定是不是 Firefox
	        if (/Firefox\/(\S+)/.test(ua)) {
	            browser.ver = RegExp["$1"];
	            browser.firefox = parseFloat(browser.ver);
	        }
	    } else if (/MSIE ([^;]+)/.test(ua)) {
	        engine.ver = browser.ver = RegExp["$1"];
	        engine.ie = browser.ie = parseFloat(engine.ver);
	    }
	    //检测浏览器
	    browser.ie = engine.ie;
	    browser.opera = engine.opera;
	    //检测平台
	    var p = navigator.platform;
	    system.win = p.indexOf("Win") == 0;
	    system.mac = p.indexOf("Mac") == 0;
	    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
	    //检测 Windows 操作系统
	    if (system.win) {
	        if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
	            if (RegExp["$1"] == "NT") {
	                switch (RegExp["$2"]) {
	                case "5.0":
	                    system.win = "2000";
	                    break;
	                case "5.1":
	                    system.win = "XP";
	                    break;
	                case "6.0":
	                    system.win = "Vista";
	                    break;
	                case "6.1":
	                    system.win = "7";
	                    break;
	                default:
	                    system.win = "NT";
	                    break;
	                }
	            } else if (RegExp["$1"] == "9x") {
	                system.win = "ME";
	            } else {
	                system.win = RegExp["$1"];
	            }
	        }
	    }
	    system.iphone = ua.indexOf("iPhone") > -1;
	    system.ipod = ua.indexOf("iPod") > -1;
	    system.ipad = ua.indexOf("iPad") > -1;
	    system.nokiaN = ua.indexOf("NokiaN") > -1;
	    //windows mobile
	    if (system.win == "CE") {
	        system.winMobile = system.win;
	    } else if (system.win == "Ph") {
	        if (/Windows Phone OS (\d+.\d+)/.test(ua)) {;
	            system.win = "Phone";
	            system.winMobile = parseFloat(RegExp["$1"]);
	        }
	    }
	    //检测 iOS 版本
	    if (system.mac && ua.indexOf("Mobile") > -1) {
	        if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
	            system.ios = parseFloat(RegExp.$1.replace("_", "."));
	        } else {
	            system.ios = 2; // 不能真正检测出来，所以只能猜测
	        }
	    }
	    //检测 Android 版本
	    if (/Android (\d+\.\d+)/.test(ua)) {
	        system.android = parseFloat(RegExp.$1);
	    }
	    //游戏系统
	    system.wii = ua.indexOf("Wii") > -1;
	    system.ps = /playstation/i.test(ua);
	    //返回这些对象
	    return {
	        engine: engine,
	        browser: browser,
	        system: system
	    };
	} ();
	module.exports = client;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/404-c645b51786f76343852a54dff74b8381.gif";

/***/ }
/******/ ]);