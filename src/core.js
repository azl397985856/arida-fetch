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
module.exports.send = function ajaxread(mothod, url, data, successCallback, errorCallback) {
	let xhr = createXMLHTTPObject();
	if (!xhr) return;
	xhr.onreadystatechange = function () {
		if (xhr.readyState != 4) return;
		if (xhr.status != 200 && xhr.status != 304) {
			if (errorCallback) {
				errorCallback(xhr.response);
			}
			return;
		}
		if (successCallback) {
			if (data.contentType === 'JSON') {
				successCallback(JSON.parse(xhr.response));
			} else {
				successCallback(xhr.response);
			}
		}
	};
	xhr.open(mothod, url, true);
	// req.setRequestHeader('User-Agent', 'XMLHTTP/1.0');
	if (xhr.readyState == 4) return;
	xhr.send(data);
};
