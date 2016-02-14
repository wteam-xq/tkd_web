// 前端脚本
$(function(){
  require("../css/main.css");
  // 公用变量
  var $main_menu = $('#mainmenu'),
  	  Client = require('../utils/client.js');
  var ADMIN_URL = 'localhost:3001';
  	  
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
    var logoUrl = require('../images/logo.png'),
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

  }

});