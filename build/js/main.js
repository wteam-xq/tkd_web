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
	  var $mainMenu = $('#mainmenu'),
	      $body = $('body'),
	      $paenlWrapper = $('#paenl_wrapper'),
	      $loadingGif = $('#loading'),
	      PageManage = __webpack_require__(8),
	      SearchManage = __webpack_require__(9),
	  	  Client = __webpack_require__(10);
	  var ADMIN_URL = 'http://localhost:8001';
	  // 初始化函数
	  init();
	  // 初始化
	  function init(){
	  	var browser = null,
	        $noCanvasTips = $('#noCanvasTips');
	    var supportImg = __webpack_require__(11),
	        loadingGif = __webpack_require__(5);
	    var _supportImg = document.createElement('img'),
	        _loadingGif = document.createElement('img');
	    var ajaxOptions = null, serviceResourceUrl = 
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
	    ajaxOptions = {
	        url: ADMIN_URL + '/tkd_rules',
	        type: "get",
	        dataType: "json",
	        success: successCallback,
	        error: failedCallback
	    };
	    $.ajax(ajaxOptions);
	    function successCallback(result){
	      if (result && !result.error){
	        $loadingGif.hide();
	        showMainPanel({"activeType":"rule", "datas":result.rules});
	        SearchManage.init();
	      } else {
	        pageMsg({msg:"请求规则数据异常：" + result.status, type:0, showMask:true});
	      }
	    }
	    function failedCallback(){
	      pageMsg({msg:"请求规则出错了！", type:0, showMask:true});
	    }
	  }
	  // 显示主面板
	  // activeType: "rule" (card heros strategy)  当前显示类型
	  // datas: []  类型数据
	  function showMainPanel(opt){
	    var aType = opt.activeType,
	        aData = opt.datas;
	    var logoUrl = __webpack_require__(12),
	        $logoDom = $('<img class="logo" alt="logo">');
	    var navbar_height = 0;
	    // 插入图片
	    $logoDom.attr('src', logoUrl);
	    $mainMenu.find('#to-person-info').append($logoDom);
	    $paenlWrapper.show();
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
	    $mainMenu.show();
	    // 主页面导航条高度设置（防止被遮住）
	    navbar_height = $mainMenu.find('div.tkd-navbar').css('height');
	    $mainMenu.css({'padding-top': navbar_height});
	    // logo跳转个人信息事件
	    $mainMenu.find('#to-person-info').on('click',logoEvent);
	  }
	  // 主面板显示规则UI
	  function showRuleContent(data){
	    var ruleList = data.ruleList,
	        i, len, ruleObj = null, 
	        itemHtml, itemHtmls = '';
	    var $rule = $('#rule');
	    $rule.empty();
	    for(var i = 0, len = ruleList.length; i < len; i++){
	      ruleObj = ruleList[i];
	      itemHtml = '<a href="##" title="'+ ruleObj.title +'" class="list-group-item list-group-item-warning" data-id="' + ruleObj._id + '">' + 
	        '<img class="pull-left list-item-img" src="' + ADMIN_URL + ruleObj.ico + '" alt="' + ruleObj.title + '" >' + 
	        '<h3 class="list-group-item-heading">' + ruleObj.title + '</h3>' + 
	        '<p class="list-group-item-text">' + ruleObj.desc + '</p>' + 
	      '</a>';
	      itemHtmls += itemHtml;
	    }
	    $rule.append(itemHtmls);
	    // 定义规则点击事件
	    $rule.find('a.list-group-item').on('click', showRuleDetail);
	  }
	  // 显示规则详情
	  function showRuleDetail(e){
	    var content = "",
	        _id = '',
	        $target = $(e.target);
	    e.preventDefault();
	    if(!$target.hasClass('list-group-item')){
	      $target = $target.parents('.list-group-item');
	    }
	    _id = $target.attr('data-id');

	    // 请求规则详情数据
	    $.get(ADMIN_URL + '/tkd_rule', {id:_id}, function(result){
	      var $ruleDetailPanel = $paenlWrapper.find('#rule-detail'),
	          detailData = null,
	          _html = "";
	      if(result && !result.error){
	        detailData = result.data;
	        // console.log(result.data);
	        if($ruleDetailPanel.length == 0){
	          $paenlWrapper.append('<div class="tkd-navbar rule-detail" id="rule-detail"><div class="panel panel-warning">规则详情页</div></div>');
	          $ruleDetailPanel = $paenlWrapper.find('#rule-detail');
	        }
	        PageManage.createAppHead($ruleDetailPanel);
	        _html = '<div class="panel panel-warning"><div class="panel-heading content-heading"></div><div class="sub-content panel-body"></div></div>';
	        $ruleDetailPanel.append(_html);
	        $ruleDetailPanel.find('div.panel-heading').html(detailData.title);
	        $ruleDetailPanel.find('div.sub-content').html(detailData.htmlCont);
	        PageManage.gotoPage($ruleDetailPanel, $mainMenu);
	      } else {
	        pageMsg({msg:"请求规则详情异常：" + result.status, type:0, showMask:true});
	      }
	    });
	  }
	  // 显示个人信息面板
	  function logoEvent(e){
	    var $main = $('#mainmenu'),
	    $target = $('#person-info');
	    e.preventDefault();
	    if ($target.length == 0){
	      // 首次渲染个人信息面板
	      renderSelfInfo($main);
	      $target = $main.next();
	    }
	    PageManage.gotoPage($target, $main);
	  }
	  // 渲染个人信息面板
	  function renderSelfInfo($prevPanel){
	    var selfHtml = '<div class="tkd-navbar person-info" id="person-info"><div class="navbar navbar-default row" role="navigation"><div class="navbar-header col-xs-5 col-md-3 pull-left">  　<a href="##" class="navbar-brand logo-brand"><span class="glyphicon glyphicon-chevron-left back-ico" data-btntype="cancel" id="back-index"></span></a>    　</div><form class="navbar-form navbar-right col-xs-7 col-md-4 row" role="search"><div class="form-group pull-left col-xs-12"><span class="glyphicon glyphicon-search tkd-search"></span><input type="text" data-parentId="person-info" class="form-control pull-right input-search" placeholder="搜索卡牌、攻略、规则"></div></form></div><div class="panel panel-warning"><div class="panel-heading">三国杀FAQ &nbsp;&nbsp;应用信息</div><ul class="list-group"><li class="list-group-item"><strong>作者: &nbsp;</strong><span>wteam-xq</span></li><li class="list-group-item"><strong>邮箱: &nbsp;</strong><span>857609086@qq.com</span></li><li class="list-group-item"><strong>QQ: &nbsp;</strong><span>857609086</span></li><li class="list-group-item"><strong>博客: &nbsp;</strong><a href="http://www.cnblogs.com/wteam-xq/" target="_blank">http://www.cnblogs.com/wteam-xq/</a></li><li class="list-group-item"><strong>知乎: &nbsp;</strong><a href="http://www.zhihu.com/people/xiao-qiang-85" target="_blank"> http://www.zhihu.com/people/xiao-qiang-85</a></li><li class="list-group-item"><strong>github: &nbsp;</strong><a href="https://github.com/wteam-xq" target="_blank"> https://github.com/wteam-xq</a></li></ul></div></div>';
	    $prevPanel.after(selfHtml);
	  }
	  /**
	   * 大提示
	   * @param {object} options
	   *   @param {string} options.msg 提示内容
	   *   @param {number} options.type 提示类型: 0 (默认) 失败   1 成功
	   *   @param {string} options.className 自定义样式
	   *   @param {boolean} options.showMask 是否显示遮罩层
	   */
	  function pageMsg(options){
	      var $pageTipsMsg = null, 
	          ts = parseInt( (new Date().getTime())/1000, 10 ),
	          tipType = options.type?options.type: '0',
	          className = options.className?options.className: '';
	      var spriteIcon = '';
	      $body.append( renderHtml({
	          tipsType: tipType,
	          str: options.msg,
	          ts: ts,
	          className: className
	      }) );
	      $pageTipsMsg = $body.find('#pageTip' + ts);
	      if (options.showMask) {
	          $pageTipsMsg.prev('.a_r_guard_mask').css({
	              'width': $(window).width(),
	              'height': $(window).height(),
	              'z-index': '2000'
	          });
	      }
	      $pageTipsMsg.show();
	      setTimeout(function (){
	          $pageTipsMsg.animate({
	              'opacity': 0
	          }, 1000, 
	          function (){
	              $pageTipsMsg.prev('.a_r_guard_mask').remove();
	              $pageTipsMsg.remove();
	          });
	      }, 1000);
	      function renderHtml(opt){
	        var htmlStr = '<div class="a_r_guard_mask"></div>' +
	        '<div class="page_tips_msg ' + opt.className +'" id="pageTip'+ opt.ts +'">' +
	          '<span class="l_icon pagetips_icon_'+ opt.tipsType +'"></span>' + '<span>'+ opt.str +'</span>' +
	        '</div>';
	        return htmlStr;
	      }
	  }
	  // 全局变量
	  window.tkdGlobalObj = {
	    testPageMsg: function(){
	      pageMsg({msg:"测试内容。。。", type:0, showMask:true});
	    }
	  };
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
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
	exports.push([module.id, ".noCanvasTips{ display: none; }\n.tkd-thumbnail{ text-align: center; }\nhtml,canvas,body{margin:0px;padding:0px;}\na:active, a:hover{outline: 0;}\n/*进度条插件*/\n.jCProgress {position: absolute;z-index: 9999999;}\n\n.jCProgress > div.percent {font: 18px/27px 'BebasRegular', Arial, sans-serif;color:#ebebeb;text-shadow: 1px 1px 1px #1f1f1f;position:absolute;margin-top:40px;margin-left:22px;text-align: center;width:60px;}\n/*首次加载出现的loading...*/\n.loading{display: block;width: 100%;text-align: center;padding: 100px;}\n/*自定义进度条样式*/\n#progress{position:fixed;top:40%;padding:0 50%;width:100%;}\n#progress .jCProgress{margin-left: -52px;}\n#start{position:fixed;top:40%;padding:0 10%;width:100%;}\n#mainmenu{width: 100%;background-color: #CFBAAA;}\n.mainmenu, .person-info, .search-info, .noCanvasTips, .rule-detail, .card-types, .card-detail, .heros-detail{display: none;position: relative;}\n\n.menu-nav{width:100%;margin: 0px 0px 0px !important;background-color: #CFBAAA;}\n.menu-nav li{padding: 0px !important;text-align: center !important;border-color: #357ebd !important;}\n\n.list-item-img{margin-right: 5px;width:65px;height:50px;background-size:65px 50px;}\n.dropup .list-group{margin-bottom: 0px !important;}\n.str-btn{border-bottom: 1px solid #ccc !important;}\n.dropup.str-btn{border-bottom: 0px solid #ccc !important;}\n.btn-pairs{width: 100% !important;border: 1px solid #ccc !important;}\n.btn-app, .btn-pairs{background-color: #FCF8E3 !important;}\n.btn-app:hover, .btn-pairs:hover{background-color: #FAF2CC !important;}\n.tkd-dropdown-menu{width: 100% !important;text-align: center !important; }\n.tkd-dropdown-menu a{padding: 10px 16px !important;}\n\n.mainmenu .logo-brand{padding: 0px !important;line-height: 50px !important;}\n.logo{width:90px;height:35px;background-size: 90px 35px;}\n.logo-brand{padding: 0px !important;}\n.navbar-form{border-width: 0px;padding: 10px 5px !important;margin-right: 0px !important;}\n.navbar-form .form-group{padding: 0px !important;}\n.navbar .navbar-header{padding: 10px 10px;}\n.tkd-navbar{top: 0;border-width: 0 0 1px;position: fixed;right: 0;left: 0;z-index: 1030;-webkit-transform: translate3d(0,0,0);-o-transform: translate3d(0,0,0);transform: translate3d(0,0,0);}\n.sub-navbar{top: 0 !important;border-width: 0 0 1px;position: fixed !important;right: 0;left: 0;z-index: 1030;}\n.navbar{margin:0px auto !important;width:100%;}\n.tkd-thumbnail{display: block;padding: 4px;margin-bottom: 20px;background-color: #fff;border: 1px solid #ddd;text-align: center;}\n\n/*置顶小按钮*/\n#backtotop{cursor: pointer;height: 50px;position: fixed;bottom: 100px;right: -60px;z-index: 9999;-moz-transition: all 1s ease;-webkit-transition: all 1s ease;-o-transition: all 1s ease;transition: all 1s ease;}\n#backtotop.showme{right: 12px;-moz-transform: scale(1) rotate(-360deg) translate(0px);-webkit-transform: scale(1) rotate(-360deg) translate(0px);-o-transform: scale(1) rotate(-360deg) translate(0px);transform: scale(1) rotate(-360deg) translate(0px);}\n#backtotop .bttbg{width: 50px;height: 50px;background: url(" + __webpack_require__(4) + ") no-repeat 0 0;background-size: 50px 100px;}\n#backtotop .bttbg:hover{background-position: left bottom;}\n.tkd-search{position: absolute !important;top: 10px !important;right: 20px !important;}\n.back-ico{line-height: 50px !important;font-size: 1.4em;}\n.search-cancel, .search-submit{font-weight: bold;text-align: center;color:#FD6D9E;line-height: 50px;font-size: 1.2em;cursor: pointer;padding-left: 0px !important;}\n.search-submit{display: none;}\n.search-info .form-group{margin: 8px 0px !important;padding-right: 0px !important;}\n.search-info input{padding-left: 25px !important;}\n.search-info .search-ico{position: absolute !important;top: 10px !important;left: 25px !important;}\n.search-info .search-close{position: absolute !important;top:3px !important;right: 10px !important; font-size:30px !important;}\n.search-item{border-bottom: 1px solid #ccc;}\n.loading-cont{text-align: center;background-color: #fff;width:100%;z-index: 999;}\n.loading-ico{width: 85px;height: 85px;background: url(" + __webpack_require__(5) + ") no-repeat 0 0;margin: 0 auto;}\n.items-type{text-align: center;background-color: #f8f8f8;color: #FD6D9E;padding: 10px 16px;font-size: 18px;line-height: 1.33;}\n.heros-dropdownmenu.row{margin: 0px !important;background-color: #FCF8E3;}\n.sub-page.row{margin: 0px !important;background-color: #fff;min-height: 300px;}\n.heros-dropdownmenu .dropdown{padding: 0px !important;}\n.heros-list{min-height: 550px;}\n.search-tips{text-align: center;}\n.rule-detail{text-align: left;}\n.sub-content{color: #666;font-size: 18px;line-height: 1.8em;}\n.card-img{background-size:200px 281px;}\n.content-heading{font-size: 18px;font-weight: bold;}\n.content-pager{position: fixed;bottom: 35px;width: 90%;font-size: 20px;margin: 0 5%;}\n.pager-tips{margin-left: 1em;}\n.blue{color: #2820DE;}\n.red{color: #CC0000;}\n\n/*二维码小图标*/\n#rightDocker{position: fixed;top: 50%;margin-top: -40px;right: 0;}\n#rightDockerBtn{border-radius: 4px 0 0 4px;}\n#rightDockerBtn i{font-size: 28px;margin-top: 2px;display: block;}\n#dockerPopover{position: fixed;}\n.popover.left .arrow{top: 50%;right: -11px;margin-top: -11px;border-right-width: 0;border-left-color: #999;border-left-color: rgba(0,0,0,.25);}\n.docker-right{vertical-align: middle;}\n.popover-content td{border-top: 0px !important;background-color: #ccc;}\n.popover-content .heading{text-align: center;color: #428bca;margin-bottom: 5px;}\n.icon-mobile-phone{font-size: 28px;color: #fff;background: #145CCD;display: inline-block;width: 36px;line-height: 36px;height: 36px;border-radius: 25px;vertical-align: middle;margin-right: 10px;}\n.docker-show{top: 25%; left: 1060px; display: block;}\n\n/*metro 风格颜色块*/\n.tile{display: block;cursor: pointer;-webkit-perspective: 0;-webkit-transform-style: preserve-3d;-webkit-transition: -webkit-transform .2s;float: left;min-width: 75px;min-height: 75px;text-align: center;opacity: .75;background-color: #2e8bcc;z-index: 1;border: 4px solid #fff;color: #fff;}\n.tile:hover{opacity: 1;}\n.tile.tile-medium{width:150px;height: 150px;}\n.tile-blue{background-color: #2e8bcc;}\n.tile-green{background-color: #393;}\n.tile-red{background-color: #e51400;}\n.tile-yellow{background-color: #ffc40d;}\n.tile-pink{background-color: #e671b8;}\n.tile-purple{background-color: #7b4f9d;}\n.tile-lime{background-color: #8cbf26;}\n.tile-magenta{background-color: #ff0097;}\n.tile-teal{background-color: #00aba9;}\n.tile-turquoise{background-color: #1abc9c;}\n.tile-green-sea{background-color: #16a085;}\n.tile-emerald{background-color: #2ecc71;}\n.tile h1, .tile h2, .tile h3, .tile h4, .tile h5, .tile h6{color: #fff;-webkit-user-select: none;}\n.tile a:hover{text-decoration: none;}\n/*二维码 显示隐藏样式*/\n.popover.fade{display: none;}\n.popover.fade.in{display: block;}\n/*大提示弹出层  photoShop 查看某个图层的具体信息： “窗口”-》“信息”  -》选中某个图层-》ctrl + T*/\n.l_icon{background: url(" + __webpack_require__(6) + ") no-repeat; }\n.a_r_guard_mask{ position:absolute; top:0; left:0; width:100%; background: #000; opacity: 0.5; filter:alpha(opacity=50); }\n.page_tips_msg{ display:none; font-size:18px; width:340px; background-color:#fff; text-align: center; position:absolute; left:38%; top:28%; z-index:2001; padding:20px 10px; }\n.page_tips_msg .pagetips_icon_0,\n.page_tips_msg .pagetips_icon_1{ display:inline-block; width:45px; height:35px; margin:0px 8px -12px 0px; }\n.page_tips_msg .pagetips_icon_0{ background-position: -50px 0px; }\n.page_tips_msg .pagetips_icon_1{ background-position: 0px 0px; }\n", ""]);

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
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEzNEFCN0RGODM0RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFQjAxMjc3QUQzMUExMUU1QUVCQkU1NTkxMkQwRTlDOCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFQjAxMjc3OUQzMUExMUU1QUVCQkU1NTkxMkQwRTlDOCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDQ4MDExNzQwNzIwNjgxMTgyMkFBMzRBQjdERjgzNEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMzRBQjdERjgzNEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4U3p0KAAAE/ElEQVR42uzcTW9UVRzA4QvoQj6D8W3tnqVvpRWMCfUFpMZo3JsoC7+DC6M7jdHEhWAEDa22xXbDixEtutKv4BeoiQUEUs+x5yY39dY5597pdNJ5nuS/aDu9w0zOr3NPe4cDH/x+sBoTL4V5PsybYe5t/+Lbj99r/aY/jhzZ6XiHw5wN82GYqz3/bU+FeSvMq2Futt3gwbW1iv3nvjGK41yY+9O81hZJgRjHxTDTaY73iCTGsdg45uxOkbD/HByzOKLTYb4Ic6hHHPMpjPrj5TBPdDjW0404opkUyQOWjkD2Io7aKx0jqeM42vL5GMmThXF814ijakQyLxKBjCKOL1viaEZytiCSuJAXWuJofn0pM5Kd4qhNi0Qgo4hj0B7oVJiPM495IcxURkSDInlmQBzNSM5bQgLZqziiP8N8nnncGNLfma80S2nz3RbHtxlxVOm+PrKEBDJMLxfGEX/79GPmseNP/RcLIlncFklpHLNpX8OEBRLP+d8L88guxHGuII5jBXHUFjtGMiUOcgKJcXwa5t0wV4YYSZc4rne8ry6RLBTEcUIckxlIHccb6eOHUySPjjCO9Z5xNCN5oSCSkjguWTaTF0iM47NGHFUjkss9IinZc6ynPcf1IT22pYJIBrktjskNpI7j9R1u0zWSOo5DexDHMCO5nfYc4pjQQD75nzi6RlIax7FdiKMZyWzHSMQhkGq1yrswMHdPcrJDHD/t8uNc7hCJ0yr+DeSrMHOZkTw0IJKTaUM+TnHU7qbJFZ+PO5aIQKLzHSJ5bNvnTxXG8ewI44iXhcSrcA8XfE+8bfzbyJRlIpAukVxuRBLjOFsYx89jHEczkgWRCKQZyenCSM7s0zhEQuulJhcKI3m/II6ZEccx3zMOkQikVR3J3SHdTx3H2ojjyHm/xq1q6zdWuZEctWwEUkcyN4RIRh3HTGEcJ9LkRjIvEoEMK5L19NN8lHHkvmf8ZgpjJcz3HSKZtnwE0ieSOo4bYxrHbIqjVkdyKzOSiyIRSNc9yajjiM70iKMZyWxBJO9YQgKpfZ0ZyXo6R78x4scSL0r8oUccpZFcq7bed4JA/hPJnQFx/LIHj+WvauvSlWsZe45BBkVyNd3XhiUkkLZI5loiiXFM7VEczUiOt0RSx7FacKyd9iRX0n2IQyDZkdRx/DoGj2n7K8lGhzhqK9siiXE8Jw6BlJxu/TZGcVSNKGIkl9Kp0mqPY9WRLItj8vT9z6u/STOONtKp0DCsZO5d8AoCk+PA5uamZwG8goBAQCAgEBAICAQEAgIBgQACAYGAQEAgIBAQCAgEBAICAYEAAgGBgEBAICAQEAgIBAQCAgEEAgIBgYBAQCAgEBAICAQEAgIBBAICAYGAQEAgIBAQCAgEBAIIBAQCAgGBgEBAICAQEAgIBAQCCAQEAgIBgYBAQCAgEBAICAQE4ikAgYBAQCAgEBAICAQEAgIBgQACAYGAQEAgIBAQCAgEBAICAYEAAgGBgEBAICAQEAgIBAQCAgEEAgIBgYBAQCAgEBAICAQEAgIBBAICAYGAQEAgIBAQCAgEBAIIBAQCAgGBgEBAICAQEAgIBAQCCAQEAgIBgYBAQCAgEBAICAQQCAgEBAICAYGAQEAgIBAQCAgEEAgIBAQCAgGBgEBAICAQEAgIxFMAAgGBgEBAICAQEAgIBAQCAgEEAgIBgYBAQCAwfv4RYACOzxPOeLdylgAAAABJRU5ErkJggg=="

/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports) {

	// 页面管理公共脚本（依赖jquery）
	var PageManage = {
		// 公用滑屏事件 打开、关闭
		gotoPage: function($target, $main){
			var This = this,
				backEvent = null,
				$backIco = null; 
			if ($target == null || $main == null){
		      return false;
		    }
		    // 搜索详情页，返回主面板
		    if ( $main.hasClass('search-detail') ){
		      $main.find('#back-index').trigger('click');
		      return false;
		    }
		    backEvent = function(e){
		      // 阻止默认事件
		      e.preventDefault();	    	
		      This.closePage($target, $main);
		    }
		    $backIco = $target.find('#back-index');
		    This.openPage($target, $main);
		    // 配置返回页面事件
		    if ( $target.attr('data-backEvent') != 'true'){
		      $backIco.on('click', backEvent);
		      $target.attr('data-backEvent', 'true');
		    }else{
		      // 去除已存在的事件
		      $backIco.off('click');
		      $backIco.on('click', backEvent);
		    }
		},
		// 打开新页面
		openPage: function($target, $main){
			if ($target == null || $main == null){
		      return false;
		    }
		    $main.css({'-webkit-transform':'translate3d(0,0,0)',
		      '-o-transform':'translate3d(0,0,0)',
		      'transform':'translate3d(0,0,0)'
		    });
		    $main.animate({'margin-left': '-' + $main.css('width')}, 500, function(){
		      var $this = $(this);
		      $this.hide();
		      $this.css('margin-left', '0px');
		    });
		    $target.css({'width': $target.css('width'), 
		      'margin-left':$target.css('width')
		    });
		    $target.show();
		    $target.css({'-webkit-transform':'translate3d(0,0,0)',
		      '-o-transform':'translate3d(0,0,0)',
		      'transform':'translate3d(0,0,0)'
		    });
		    $target.animate({'margin-left':'0px'}, 500, function(){
		      var $this = $(this);
		      // 解决 新页面fixed 无效Bug
		      $this.css({'-webkit-transform':'none',
		        '-o-transform':'none',
		        'transform':'none'
		      });
		      $this.css({'width':'100%', 'position':'relative'});
		    });
		},
		// 关闭打开的页面
		closePage: function($target, $main){
			var $backIco = null;
			if ($target == null || $main == null){
		      return false;
		    }
		    $backIco = $target.find('#back-index');
		    $main.css('margin-left', '-' + $main.css('width'));
		    $main.show();
		    $main.css({'-webkit-transform':'translate3d(0,0,0)',
		      '-o-transform':'translate3d(0,0,0)',
		      'transform':'translate3d(0,0,0)'
		    });
		    $main.animate({'margin-left':'0px'}, 500, function(){
		    });
		    $target.css({'-webkit-transform':'translate3d(0,0,0)',
		      '-o-transform':'translate3d(0,0,0)',
		      'transform':'translate3d(0,0,0)'
		    });
		    $target.css({'width':$target.css('width'), 'position':'fixed'});
		    $target.animate({'margin-left': $target.css('width')}, 500, function(){
		      var $this = $(this);
		      $this.hide();
		      $this.css({'margin-left':'0px', 'width':'100%'});
		      // 获得原padding-top高度值
		      // 更多原生js 获取样式值方法：http://www.zhangxinxu.com/wordpress/2012/05/getcomputedstyle-js-getpropertyvalue-currentstyle/
		      padding_height = $main[0].style.paddingTop;
		      // 恢复主页面内联样式
		      setTimeout(function(){
		        $main.attr({'style':'display: block; padding-top:' + padding_height});
		      }, 200);
		    });
		},
		// 生成头部导航页
		createAppHead: function($target_dom){
			var p_id = '',
		    _html = '';
		    if ($target_dom == null){
		      return false;
		    }
		    p_id = $target_dom.attr('id');
		    _html = '<div class="navbar sub-navbar navbar-default row"role="navigation"><div class="navbar-header col-xs-5 col-md-3 pull-left"><a href="##"class="navbar-brand logo-brand"><span class="glyphicon glyphicon-chevron-left back-ico"data-btntype="cancel"id="back-index"></span></a></div><form class="navbar-form navbar-right col-xs-7 col-md-4 row"role="search"><div class="form-group pull-left col-xs-12"><span class="glyphicon glyphicon-search tkd-search"></span><input type="text" data-parentId="'+ p_id +'"class="form-control pull-right input-search"placeholder="搜索卡牌、攻略、规则"></div></form></div>';
		    $target_dom.empty();
		    $target_dom.append(_html);
		    // 添加内边距(页面渲染完成执行)
		    setTimeout(function(){
		      $target_dom.css({'padding-top': $target_dom.find('div.sub-navbar').css('height')});
		    },10);
		    return $target_dom;
		}
	};
	module.exports = PageManage;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// 搜索公共脚本（依赖jquery）
	var SearchManage = null,
		PageManage = __webpack_require__(8);

	SearchManage = {
		$searchInfo: null,
		init: function(){
			var This = this;
			this.$searchInfo = $('#search-info');
			this.initEvt();
		},
		initEvt: function(){
			var $searchInfo = this.$searchInfo;
			// on 实现 live(第二个参数带上筛选器即可)  
	    	$body.on('focus', 'input.input-search', toSearchEvent);
	    	//搜索框点击事件
		    $searchInfo.find('.search-close').on('click', removeSearchEvent);
		    $searchInfo.find('input').on('input', watchInputEvent);
		    $searchInfo.find('#search-submit').on('click', searchBtnEvent);
		}
	};

	// 跳转至搜索页面
	function toSearchEvent(){
		var $target = $('#search-info'),
		    $this = $(this),
		    parent_id = $this.attr('data-parentId'),
		    $main = $('#' + parent_id);
	    PageManage.gotoPage($target, $main);
	}

	// 取消搜索结果
	function removeSearchEvent(){
		var $this = $(this),
		    $searchInput = $this.prev('input'),
		    $backIndex = $this.parents('.navbar').find('#back-index'),
		    $searchSubmit = $this.parents('.navbar').find('#search-submit');
	    if ($searchInput.val() == ''){
	      return false;
	    }
	    $searchInput.val('');
	    $backIndex.show();
	    $searchSubmit.hide();
	    $this.addClass('hidden');
	}

	// 监听搜索内容
	function watchInputEvent(){
		var $this = $(this),
	    $closeBtn = $this.next('.search-close'),
	    $backIndex = $this.parents('.navbar').find('#back-index'),
	    $searchSubmit = $this.parents('.navbar').find('#search-submit');
	    if ($this.val().length == 0){
	      $backIndex.show();
	      $searchSubmit.hide();
	      if (!$closeBtn.hasClass('hidden')){
	        $closeBtn.addClass('hidden');
	      }
	    }else if( $backIndex.is(':visible') ){
	      $backIndex.hide();
	      $searchSubmit.show();
	      $closeBtn.removeClass('hidden');
	      return false;
	    }
	}

	// 提交搜索结果
	function searchBtnEvent(){
		var $this = $(this),
	    	val = '';
	    val = $this.prevAll('.form-group').find('input').val();
	    alert('显示搜索结果');
	    // searchEvent(val);
	}

	module.exports = SearchManage;


/***/ },
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/404-c645b51786f76343852a54dff74b8381.gif";

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/logo-3e22ab53876412335b09ae7acf314b73.png";

/***/ }
/******/ ]);