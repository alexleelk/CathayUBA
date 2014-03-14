// cxluaa.js

// 用户行为分析插件，需要和jquery一起使用
// 观察页面的所有元素，但只记录有data-uba='uba'属性的dom元素
$("*").click(function(){
	if (this.attr("data-uba")="uba") {
		cxluaaAction(this, "click");
	}
});

$("*").mouseover(function(){
	if (this.attr("data-uba")="uba") {
		cxluaaAction(this, "mouseover");
	}
});

function cxluaaAction (obj, type) {
	// 解析url
	var fields = {
		'username' : 4,
		'password' : 5,
		'port' : 7,
		'protocol' : 2,
		'host' : 6,
		'pathname' : 8,
		'URL' : 0,
		'querystring' : 9,
		'fragment' : 10
	};
	
	var values = {};
	
	for(var i in fields) {
		values[i] = '';
	}
	
	var regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
	
	//alert("window.location=" + window.location);
	
	var isMatch = regex.exec(window.location);
	
	for (var i in fields) if (typeof isMatch[fields[i]] != 'undefined') {
		values[i] = isMatch[fields[i]];
    }
    
	//alert("memberId=" + GLOBAL_PARAMS.getLoginId());

	// 发送后台信息 这里因为是跨站访问，所以使用jsonp
	$.ajax({
		type: "get",
		async: false,
		//url: "https://www.52toubao.com:3000/mouse?"
		url: "http://localhost:3000/mouse?"
			+ "memberId=" + GLOBAL_PARAMS.getLoginId()
			+ "&elementName=" + $(obj).attr("id")
			+ "&pathName=" + values.pathname
			+ "&queryString=" + values.querystring
			+ "&type=" + type
			+ "&random=" + Date(),
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: "mouse",
		success: function(json) {
			// do nothing
		},
		error: function(){
			// do nothing
		}
	});
	
	return false;
}