// 搜索公共脚本（依赖jquery）
var SearchManage = null,
	PageManage = require('../common/pageManage.js');

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

}

// 取消搜索结果
function removeSearchEvent(){

}

// 监听搜索内容
function watchInputEvent(){

}

// 提交搜索结果
function searchBtnEvent(){
	
}

module.exports = SearchManage;
