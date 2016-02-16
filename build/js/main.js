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
	  	  Client = __webpack_require__(7);
	  var ADMIN_URL = 'localhost:8001';
	  	  
	  // 初始化函数
	  init();
	  // 初始化
	  function init(){
	  	var browser = null,
	        $loadingGif = $('#loading'),
	        $noCanvasTips = $('#noCanvasTips');
	    var supportImg = __webpack_require__(8),
	        loadingGif = __webpack_require__(5);
	    var _supportImg = document.createElement('img'),
	        _loadingGif = document.createElement('img');
	    // 低版本浏览器时出现提示
	    browser = Client.browser;
	  	// 引入图片
	    _supportImg.src = supportImg;
	    _loadingGif.src = loadingGif;
	    $loadingGif.append(_loadingGif);
	    if(browser.ie && parseInt(browser.ver, 10) < 9){
	      $noCanvasTips.find('.tkd-thumbnail').append(_supportImg);
	      $noCanvasTips.show();
	    }
	    $loadingGif.show();
	    // 请求首页数据(ajax请求)
	    $.ajax({
	      url:ADMIN_URL + "/tkd_rules", 
	      success:function(result){
	        if (result){
	          $loadingGif.hide();
	          showMainPanel({"activeType":"rule", "datas":result});
	        } else {
	          alert('请求规则数据异常!');
	        }
	      }
	    });
	  }
	  // 显示主面板
	  // activeType: "rule" (card heros strategy)  当前显示类型
	  // datas: []  类型数据
	  function showMainPanel(opt){
	    var aType = opt.activeType,
	        aData = opt.datas;
	    var logoUrl = __webpack_require__(9),
	        $logoDom = $('<img class="logo" alt="logo">');
	    // 插入图片
	    $logoDom.attr('src', logoUrl);
	    $main_menu.find('#to-person-info').append($logoDom);
	    switch(aType){
	      case 'rule':
	        showRuleContent(aData);
	        break;
	      case 'card':
	        console.log('card');
	        break;
	      case 'heros':
	        console.log('heros');
	        break;
	      case 'strategy':
	        console.log('strategy');
	        break;
	      default:
	        showRuleContent(aData);
	        break;
	    }
	    $main_menu.show();
	  }
	  // 主面板显示规则UI
	  function showRuleContent(ruleData){
	    
	    console.log('ruleData:' + ruleData);
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
	var update = __webpack_require__(6)(content, {});
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
	exports.push([module.id, ".noCanvasTips{ display: none; }\n.tkd-thumbnail{ text-align: center; }\nhtml,canvas,body{margin:0px;padding:0px;}\na:active, a:hover{outline: 0;}\n/*进度条插件*/\n.jCProgress {position: absolute;z-index: 9999999;}\n\n.jCProgress > div.percent {font: 18px/27px 'BebasRegular', Arial, sans-serif;color:#ebebeb;text-shadow: 1px 1px 1px #1f1f1f;position:absolute;margin-top:40px;margin-left:22px;text-align: center;width:60px;}\n/*首次加载出现的loading...*/\n.loading{display: block;width: 100%;text-align: center;padding: 100px;}\n/*自定义进度条样式*/\n#progress{position:fixed;top:40%;padding:0 50%;width:100%;}\n#progress .jCProgress{margin-left: -52px;}\n#start{position:fixed;top:40%;padding:0 10%;width:100%;}\n#mainmenu{width: 100%;background-color: #CFBAAA;}\n.mainmenu, .person-info, .search-info, .noCanvasTips, .rule-detail, .card-types, .card-detail, .heros-detail{display: none;position: relative;}\n\n.menu-nav{width:100%;margin: 0px 0px 0px !important;background-color: #CFBAAA;}\n.menu-nav li{padding: 0px !important;text-align: center !important;border-color: #357ebd !important;}\n\n.list-item-img{margin-right: 5px;width:65px;height:50px;background-size:65px 50px;}\n.dropup .list-group{margin-bottom: 0px !important;}\n.str-btn{border-bottom: 1px solid #ccc !important;}\n.dropup.str-btn{border-bottom: 0px solid #ccc !important;}\n.btn-pairs{width: 100% !important;border: 1px solid #ccc !important;}\n.btn-app, .btn-pairs{background-color: #FCF8E3 !important;}\n.btn-app:hover, .btn-pairs:hover{background-color: #FAF2CC !important;}\n.tkd-dropdown-menu{width: 100% !important;text-align: center !important; }\n.tkd-dropdown-menu a{padding: 10px 16px !important;}\n\n.mainmenu .logo-brand{padding: 0px !important;line-height: 50px !important;}\n.logo{width:90px;height:35px;background-size: 90px 35px;}\n.logo-brand{padding: 0px !important;}\n.navbar-form{border-width: 0px;padding: 10px 5px !important;margin-right: 0px !important;}\n.navbar-form .form-group{padding: 0px !important;}\n.navbar .navbar-header{padding: 10px 10px;}\n.tkd-navbar{top: 0;border-width: 0 0 1px;position: fixed;right: 0;left: 0;z-index: 1030;-webkit-transform: translate3d(0,0,0);-o-transform: translate3d(0,0,0);transform: translate3d(0,0,0);}\n.sub-navbar{top: 0 !important;border-width: 0 0 1px;position: fixed !important;right: 0;left: 0;z-index: 1030;}\n.navbar{margin:0px auto !important;width:100%;}\n.tkd-thumbnail{display: block;padding: 4px;margin-bottom: 20px;background-color: #fff;border: 1px solid #ddd;text-align: center;}\n\n/*置顶小按钮*/\n#backtotop{cursor: pointer;height: 50px;position: fixed;bottom: 100px;right: -60px;z-index: 9999;-moz-transition: all 1s ease;-webkit-transition: all 1s ease;-o-transition: all 1s ease;transition: all 1s ease;}\n#backtotop.showme{right: 12px;-moz-transform: scale(1) rotate(-360deg) translate(0px);-webkit-transform: scale(1) rotate(-360deg) translate(0px);-o-transform: scale(1) rotate(-360deg) translate(0px);transform: scale(1) rotate(-360deg) translate(0px);}\n#backtotop .bttbg{width: 50px;height: 50px;background: url(" + __webpack_require__(4) + ") no-repeat 0 0;background-size: 50px 100px;}\n#backtotop .bttbg:hover{background-position: left bottom;}\n.tkd-search{position: absolute !important;top: 10px !important;right: 20px !important;}\n.back-ico{line-height: 50px !important;font-size: 1.4em;}\n.search-cancel, .search-submit{font-weight: bold;text-align: center;color:#FD6D9E;line-height: 50px;font-size: 1.2em;cursor: pointer;padding-left: 0px !important;}\n.search-submit{display: none;}\n.search-info .form-group{margin: 8px 0px !important;padding-right: 0px !important;}\n.search-info input{padding-left: 25px !important;}\n.search-info .search-ico{position: absolute !important;top: 10px !important;left: 25px !important;}\n.search-info .search-close{position: absolute !important;top:3px !important;right: 10px !important; font-size:30px !important;}\n.search-item{border-bottom: 1px solid #ccc;}\n.loading-cont{text-align: center;background-color: #fff;width:100%;z-index: 999;}\n.loading-ico{width: 85px;height: 85px;background: url(" + __webpack_require__(5) + ") no-repeat 0 0;margin: 0 auto;}\n.items-type{text-align: center;background-color: #f8f8f8;color: #FD6D9E;padding: 10px 16px;font-size: 18px;line-height: 1.33;}\n.heros-dropdownmenu.row{margin: 0px !important;background-color: #FCF8E3;}\n.sub-page.row{margin: 0px !important;background-color: #fff;min-height: 300px;}\n.heros-dropdownmenu .dropdown{padding: 0px !important;}\n.heros-list{min-height: 550px;}\n.search-tips{text-align: center;}\n.rule-detail{text-align: left;}\n.sub-content{color: #666;font-size: 18px;line-height: 1.8em;}\n.card-img{background-size:200px 281px;}\n.content-heading{font-size: 18px;font-weight: bold;}\n.content-pager{position: fixed;bottom: 35px;width: 90%;font-size: 20px;margin: 0 5%;}\n.pager-tips{margin-left: 1em;}\n.blue{color: #2820DE;}\n.red{color: #CC0000;}\n\n/*二维码小图标*/\n#rightDocker{position: fixed;top: 50%;margin-top: -40px;right: 0;}\n#rightDockerBtn{border-radius: 4px 0 0 4px;}\n#rightDockerBtn i{font-size: 28px;margin-top: 2px;display: block;}\n#dockerPopover{position: fixed;}\n.popover.left .arrow{top: 50%;right: -11px;margin-top: -11px;border-right-width: 0;border-left-color: #999;border-left-color: rgba(0,0,0,.25);}\n.docker-right{vertical-align: middle;}\n.popover-content td{border-top: 0px !important;background-color: #ccc;}\n.popover-content .heading{text-align: center;color: #428bca;margin-bottom: 5px;}\n.icon-mobile-phone{font-size: 28px;color: #fff;background: #145CCD;display: inline-block;width: 36px;line-height: 36px;height: 36px;border-radius: 25px;vertical-align: middle;margin-right: 10px;}\n.docker-show{top: 25%; left: 1060px; display: block;}\n\n/*metro 风格颜色块*/\n.tile{display: block;cursor: pointer;-webkit-perspective: 0;-webkit-transform-style: preserve-3d;-webkit-transition: -webkit-transform .2s;float: left;min-width: 75px;min-height: 75px;text-align: center;opacity: .75;background-color: #2e8bcc;z-index: 1;border: 4px solid #fff;color: #fff;}\n.tile:hover{opacity: 1;}\n.tile.tile-medium{width:150px;height: 150px;}\n.tile-blue{background-color: #2e8bcc;}\n.tile-green{background-color: #393;}\n.tile-red{background-color: #e51400;}\n.tile-yellow{background-color: #ffc40d;}\n.tile-pink{background-color: #e671b8;}\n.tile-purple{background-color: #7b4f9d;}\n.tile-lime{background-color: #8cbf26;}\n.tile-magenta{background-color: #ff0097;}\n.tile-teal{background-color: #00aba9;}\n.tile-turquoise{background-color: #1abc9c;}\n.tile-green-sea{background-color: #16a085;}\n.tile-emerald{background-color: #2ecc71;}\n.tile h1, .tile h2, .tile h3, .tile h4, .tile h5, .tile h6{color: #fff;-webkit-user-select: none;}\n.tile a:hover{text-decoration: none;}\n/*二维码 显示隐藏样式*/\n.popover.fade{display: none;}\n.popover.fade.in{display: block;}\n", ""]);

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
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABkCAYAAADE6GNbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABUtJREFUeNrsm2tMHFUUx//sCxaryZaakhZitGlMTLQaX20Ta9MoRGqJ0gSa4qt+MD4iPoqY2sQPRr/0A/h+BLWtBSNut7FaKKWV+GiRpF+aajS2pRZYoAldll1gd3F3drxnmEHcHcrsMosz23vIze7szN57fveec+/M3T8AN2NZjspnNlZyWbGzYpnlmv/DRFbirERZmRRFMSYB5OSoQuU2NDTc6vP5WqPR6EXRYEY+kW/ko9zZqp1sd7vda2Ox2KhocCMfPR7POjlqkuwqRtsumsT8fn8H83mRWo64BEHotVgsV5shuePxeMhqtRaxt37IyayYxSwQsrP5M/23ZMv0a0ua40TRHOtGwrSbNSPCQTgIB7lCQPj0e0WGFvWe2nODaUDI+cjkJL7/4WecOXee7o8WLkf0hAhHInj7g0b4RgKICTFUPfwg1q6+k+5czQGiQLzz4acIjIXgdDoRZ5PI/oNt0vlMwFgyCTEanIDNZpNmQvo8z5kvwXR1n9Q9zHSdfsm5aYjAuHQciYSx9NoC+ANBCEIcuXnOpJHRY8rXLbRmQvhHxyCyvzy7HU9Ub8WNK1cgFA7j0OEO/HLyFBx2B9w6w8ycEwtYZZfY4+48ICixg1Jib1i3BuVlpZKDipN0Xb93AE0tB3BpZBTUVuVDG7Hm7jv+c50WY4+5FK5L2FufLiAKRMP7jRj2jbAwWoxHqjajuGh5Uk8r6wmVb1uP4NiPJyiWsWVzecowuoIoTn3UuAe//3kWJRvuRfnGf0dhNqeU742M+LH3Szd6/rqA6sqKlGDmBInFYppHgpzZ09TCwmUQ2x6tQtHyZZrjfebofNfWgdb2Y3i8uhKr77pdEwzNhrqAUI8QRMFilzQKCkCqSUsg1CnegUHs3teCTWUlWHXzTXOuM7qAUOOnf/sDSwpcKY2CltGh2xmayRx2+8KMiNKwnit0KnUmgqS9jqQTRpmskz+P8EddPiIchINwEA6SrdMvu8WJj5nFcfoxFFMCgiSQaDAY7Kbbc6Mb+ch8PYEpFUQSyGRnZ+eb7DUgP30ZDoB8kjs6IPs6OdtGhCLhaI9Go8MGlHAMk29qEo7LiWoc8nkjiWqo/A0VUc28nZz3fpSGEL5cG0ZMAW5ZZVxBZwoFHVv+RUEQDFnINzUF3UwiUtB5XC5XqdFvHCmcAoHAUeZrBTscTwSRFHTs1SziM66g40+IHISDcBAOwkE4CAdBlijoQqEw3AcO4tTpX82roJuYCOHFup3o7fdKPznX1jyDB0rvN5eCjiBeenUnvINDcDhypS2d+vc+kc5nAsaSSYj+gSEWTtbpfSm7wyHBHD5yVPcws2QMwjvEji2IRaMoXlYIh82GuCDAZrdnBMaWCYg+76C05+G6ZhHqXn4et626BePjE9i9r1nSaVmtNgbzsa5hlqRFSafSaQhKbO8A6/k4tlZV4MnHqpOEZ2d7zmNX/bvo7RuQALbXPJ0WjCyzml1Uk2qF07PTK6/hQp8X119XjLrtNVi54gZVbYmypnz+RTOav9ovfVb7wrMpwySCIAEk5e0Zsh2vvyGuLy0XP9vbJB3PtZ1E58mGhi6KNbU7xPUlm8S29g4xlfbFqR4qUINMGYTsrV314rannhPPnOvRBKEGRB1wz31lEozW7+sGQg0ShNZRmMsp6gjqkJ+Od2mqKxEkrRyhGD/e1Y3CwqVSLugy68i587XnG5SxfMnPdy5MslOjmdiR1FpvIkjaK1KmtlW5go6DcBAOwkE4CAfhINmsoDOD2oZ8nFNBx0gDRoaR/7+EK+iMYMZW0OkRalll/wgwAAnsKJ5cTRkxAAAAAElFTkSuQmCC"

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/loading-16b79d5f5d6ed6f88b1bf63d23d87df6.gif";

/***/ },
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/404-c645b51786f76343852a54dff74b8381.gif";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/logo-3e22ab53876412335b09ae7acf314b73.png";

/***/ }
/******/ ]);