import fetch from '../src/index.js';

(
	function test() {
	var request = {
	        comment: function getComment() {
	            return fetch.get('http://azu.github.io/promises-book/json/comment.json').then(JSON.parse);
	        },
	        people: function getPeople() {
	            return fetch.get('http://azu.github.io/promises-book/json/people.json').then(JSON.parse);
	        }
	    };
	function main() {
	    return fetch.sequenceTasks([request.comment, request.people]);
	}
	// 运行示例
	main().then(function (value) {
	    console.log(value);
	}).catch(function(error){
	    console.error(error);
	});
})()