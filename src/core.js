let XMLHttpFactories = [
	function() {
		return new XMLHttpRequest();
	},
	function () {
		return new window.ActiveXObject('Msxml2.XMLHTTP');
	},
	function () {
		return new window.ActiveXObject('Msxml3.XMLHTTP');
	},
	function () {
		return new window.ActiveXObject('Microsoft.XMLHTTP');
	},
];
function createXMLHTTPObject() {
	let xmlhttp = false;
	for (let i = 0; i < XMLHttpFactories.length; i++) {
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
  return new Promise(resolve => setTimeout(resolve, ms))
}
let queue = [];
const fetch = {
	send: function(param) {// mothod, url, data, success, error, complete, complete, timeout, sync
		// console.log(param.mothod);
		let xhr = createXMLHTTPObject();
		if (!xhr) return;
		const mothod = param['mothod'] ? param['mothod'] : 'get';
        const url = param['url'] ? param['url'] : '#';
        const sync = param['sync'] ? param['sync'] : true;
        const data = param['data'] ? param['data'] : null;
        const dataType = param['dataType'] ? param['dataType'] : 'html';
        const success = typeof param['success'] == 'function' ? param['success'] : function(){};
        const error = typeof param['error'] == 'function' ? param['error'] : function(){};
        const complete = typeof param['complete'] == 'function' ? param['complete'] : function(){};
        const timeout = param['timeout'] ? param['timeout'] : 3000;
        try
        {
        	if (this.setting.strategy === 'lazy') {
        		sleep(500);
        	} else {
    			 xmlhttp.open(mothod, url, !sync);
	            xmlhttp.send(data);
	            xmlhttp.onreadystatechange = function()
	            {
	                if(xmlhttp.readyState != 4){return;}
	                switch (xmlhttp.status)
	                {
	                    case 200 : success(xmlhttp.responseText);complete(xmlhttp,'success');break;
	                    case 404 : error(xmlhttp,'Not Found',null);complete(xmlhttp,'error');break;
	                    case 500 : error(xmlhttp,'Internal Server Error',null);complete(xmlhttp,'error');break;
	                    default : error(xmlhttp,'error',null);complete(xmlhttp,'error');break;
	                }
	            };
        	}
        }
        catch(e)
        {
            error(xmlhttp,'error',e);
            complete(xmlhttp,'error');
        }
},
	push: function(ajax) {
		queue.push(ajax);
	},
	batchSend: function() {
		for (var i = 0; i < queue.length; i++) {
			this.send({mothod: queue[i].mothod});
		}
	},
	setting: {
		strategy: 'default'
	}
}

export default fetch;
module.exports = exports['default'];
