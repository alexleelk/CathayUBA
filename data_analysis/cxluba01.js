/*
 * 用户行为分析脚本，使用mapreduce
 * 1.哪些页面元素用户看的最多。
 * 2.用户经过几步点了投保按钮。
 * 3.用户经过多少时间点了投保按钮。
 * 4.用户最先看什么页面元素。
 * 5.投保之前用户看了什么。
 * 数据库为mongodb，ip地址：10.20.40.132
 * 数据库cxluaa 集合records
 * 记录结构:
 * {'sessionId': 当前的session的id
 *  , 'memberId': 如果用户登录过则为menber id
 *  , 'ipAddress': 用户的ip地址
 *  , 'timestamp': 当前时间戳
 *  , 'elementName': 浏览或者点击的页面元素
 *  , 'pathName': 浏览器url
 *  , 'queryString': url中的查询数据
 *  , 'type': 浏览(mouseover)或者点击(click)
 * }
 */

//按照所有的页面元素进行分组
var mapf1 = function() {
	emit(this.elementName, 1);
};

//按照sessionid分组取得最小的时间，并返回value
var reducef1 = function(key, values) {
	var total = 0;
	values.forEach(function(doc) {
		total += 1;
	});
	return total;
};

db.runCommand({
	mapreduce: "records"
	, map: mapf1
	, reduce: reducef1
	, out: "analysis1"
});