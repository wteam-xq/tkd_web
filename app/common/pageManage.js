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
	}
};
module.exports = PageManage;
