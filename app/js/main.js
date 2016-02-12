// 前端脚本
$(function(){
  require("../css/main.css");
  // 公用变量
  var $main_menu = $('#mainmenu'),
  	  Client = require('../utils/client.js');
  var loadingImg = require('../images/404.gif');
  	  
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
    if(browser.ie && parseInt(browser.ver, 10) < 9){
      $noCanvasTips.show();
    }
    // 首页请求 卡牌数据
    
  }
});