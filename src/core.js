;function _sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
function sequenceTasks(tasks) {
    function recordValue(results, value) {
        results.push(value);
        return results;
    }
    var pushValue = recordValue.bind(null, []);
    return tasks.reduce(function (promise, task) {
        return promise.then(task).then(pushValue);
    }, Promise.resolve());
}

let global_settings = {
	async: false,
	dataType: 'json',
	contentType: 'application/json',
	xhrFields: {
		withCredentials: false
	},
	delay: 500,
	strategy: 'lazy'
}
const fetch = {
	get: function(URL, settings = global_settings) {
		return new Promise(function (resolve, reject) {
	        var req = new XMLHttpRequest();
	        req.open('GET', URL, settings.async);
	        // set req header
	        req.setRequestHeader('Content-Type', settings.contentType);
	        req.setRequestHeader('With-Credentials', settings.contentType);
	        req.setRequestHeader('Data-Type', settings.dataType);
	        req.onload = function () {
	            if (req.status === 200) {
	                resolve(req.responseText);
	            } else {
	                reject(new Error(req.statusText));
	            }
	        };
	        req.onerror = function () {
	            reject(new Error(req.statusText));
	        };
	        req.send();
	    });
	},
	post: function(payload, settings = global_settings) {
		return new Promise(function (resolve, reject) {
	        var req = new XMLHttpRequest();
	        req.open('POST', payload.URL, true); // TRUE OR FALSE by setting given by user
	        req.onload = function () {
	            if (req.status === 200) {
	                resolve(req.responseText);
	            } else {
	                reject(new Error(req.statusText));
	            }
	        };
	        req.onerror = function () {
	            reject(new Error(req.statusText));
	        };
	        req.send(payload.data);
	    });
	},
	sequenceTasks: function(tasks) {
		return sequenceTasks(tasks);
	},
	setDefault: function(settings) {
		global_settings = settings;
	}
}

export default fetch;
module.exports = exports['default'];
