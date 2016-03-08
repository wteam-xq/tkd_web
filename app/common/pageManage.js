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
