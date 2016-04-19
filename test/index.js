import fetch from '../src/index.js';

(function test() {
	// fetch.send({sync: true});
	fetch.push({mothod:'post'});
	fetch.push({mothod:'post'});
	fetch.push({mothod:'get'});
	fetch.push({mothod:'post'});
	fetch.push({mothod:'get'});
	fetch.batchSend();
})()