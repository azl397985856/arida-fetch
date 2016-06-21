'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
;function _sleep(ms) {
	return new Promise(function (resolve) {
		return setTimeout(resolve, ms);
	});
}
function _sequenceTasks(tasks) {
	function recordValue(results, value) {
		results.push(value);
		return results;
	}
	var pushValue = recordValue.bind(null, []);
	return tasks.reduce(function (promise, task) {
		return promise.then(task).then(pushValue);
	}, Promise.resolve());
}
var queue = [];
// setting:{ sync: boolean, timeout: ms   ,dataType,strategy}
var fetch = {
	get: function get(URL, setting) {
		return new Promise(function (resolve, reject) {
			var req = new XMLHttpRequest();
			req.open('GET', URL, true);
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
	post: function post(URL, data, setting) {
		return new Promise(function (resolve, reject) {
			var req = new XMLHttpRequest();
			req.open('POST', URL, true); // TRUE OR FALSE by setting given by user
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
	sequenceTasks: function sequenceTasks(tasks) {
		return _sequenceTasks(tasks);
	}
};

exports.default = fetch;

module.exports = exports['default'];