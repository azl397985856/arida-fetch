'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var XMLHttpFactories = [function () {
	return new XMLHttpRequest();
}, function () {
	return new window.ActiveXObject('Msxml2.XMLHTTP');
}, function () {
	return new window.ActiveXObject('Msxml3.XMLHTTP');
}, function () {
	return new window.ActiveXObject('Microsoft.XMLHTTP');
}];
function createXMLHTTPObject() {
	var xmlhttp = false;
	for (var i = 0; i < XMLHttpFactories.length; i++) {
		try {
			xmlhttp = XMLHttpFactories[i]();
		} catch (e) {
			continue;
		}
		break;
	}
	return xmlhttp;
}
function sleep(ms) {
	return new Promise(function (resolve) {
		return setTimeout(resolve, ms);
	});
}
var queue = [];
var fetch = {
	send: function send(param) {
		// mothod, url, data, success, error, complete, complete, timeout, sync
		// console.log(param.mothod);
		var xhr = createXMLHTTPObject();
		if (!xhr) return;
		var mothod = param['mothod'] ? param['mothod'] : 'get';
		var url = param['url'] ? param['url'] : '#';
		var sync = param['sync'] ? param['sync'] : true;
		var data = param['data'] ? param['data'] : null;
		var dataType = param['dataType'] ? param['dataType'] : 'html';
		var success = typeof param['success'] == 'function' ? param['success'] : function () {};
		var error = typeof param['error'] == 'function' ? param['error'] : function () {};
		var complete = typeof param['complete'] == 'function' ? param['complete'] : function () {};
		var timeout = param['timeout'] ? param['timeout'] : 3000;
		try {
			if (this.setting.strategy === 'lazy') {
				sleep(500);
			} else {
				xmlhttp.open(mothod, url, !sync);
				xmlhttp.send(data);
				xmlhttp.onreadystatechange = function () {
					if (xmlhttp.readyState != 4) {
						return;
					}
					switch (xmlhttp.status) {
						case 200:
							success(xmlhttp.responseText);complete(xmlhttp, 'success');break;
						case 404:
							error(xmlhttp, 'Not Found', null);complete(xmlhttp, 'error');break;
						case 500:
							error(xmlhttp, 'Internal Server Error', null);complete(xmlhttp, 'error');break;
						default:
							error(xmlhttp, 'error', null);complete(xmlhttp, 'error');break;
					}
				};
			}
		} catch (e) {
			error(xmlhttp, 'error', e);
			complete(xmlhttp, 'error');
		}
	},
	push: function push(ajax) {
		queue.push(ajax);
	},
	batchSend: function batchSend() {
		for (var i = 0; i < queue.length; i++) {
			this.send({ mothod: queue[i].mothod });
		}
	},
	setting: {
		strategy: 'default'
	}
};

exports.default = fetch;

module.exports = exports['default'];