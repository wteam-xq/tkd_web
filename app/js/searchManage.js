// 搜索公共脚本（依赖jquery）
var SearchManage = null,
	PageManage = require('../common/pageManage.js');
var $body = null;

SearchManage = {
	$searchInfo: null,
	init: function(){
		var This = this;
    $body = $('body');
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
