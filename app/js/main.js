// 前端脚本
$(function(){
  require("../css/main.css");
  // 公用变量
  var $mainMenu = $('#mainmenu'),
      $paenlWrapper = $('#paenl_wrapper'),
  	  Client = require('../utils/client.js');
  var ADMIN_URL = 'http://localhost:8001';
  	  
  // 初始化函数
  init();
  // 初始化
  function init(){
  	var browser = null,
        $loadingGif = $('#loading'),
        $noCanvasTips = $('#noCanvasTips');
    var supportImg = require('../images/404.gif'),
        loadingGif = require('../images/loading.gif');
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
      if (result){
        $loadingGif.hide();
        showMainPanel({"activeType":"rule", "datas":result});
      } else {
        alert('请求规则数据异常!');
      }
    }
    function failedCallback(){
      alert('请求规则出错了！');
    }
  }
  // 显示主面板
  // activeType: "rule" (card heros strategy)  当前显示类型
  // datas: []  类型数据
  function showMainPanel(opt){
    var aType = opt.activeType,
        aData = opt.datas;
    var logoUrl = require('../images/logo.png'),
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
  }
  // 主面板显示规则UI
  function showRuleContent(data){
    var ruleList = data.rules.ruleList,
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
  }

});