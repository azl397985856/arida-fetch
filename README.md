## Introduction
A libabry for communicating with server. we send requests sychronously by default in case of occuring wired things. And combine your http request is supported. But it needs backend to analyze and response the serizable responses content.
## Install

```bash
npm install arida-fetch
```

## Usage example

``` javascript
impot fetch from 'arida-fetch';

fetch.get('http://www.itechnique.cn/get/1')
.then((data)=>{
	console.log(data);
})
.catch((error)=>{
	console.log(error);
});
fetch.post({
	URL: 'http://www.itechnique.cn/get/2',
	data: {a: 1}
}).then((data)=>{
	console.log(data);
})
.catch((error)=>{
	console.log(error);
});;
```
Then two requets will be sent to the server on by one , For more information, plz check the API doc.

## API
The following is an incomplete list of arida-fetch API. It should give you a general concept of arida-fetch's usage.

- `.sequenceTasks(tasks)`: send your request in order to server;
- `.setDefault(settings): modify the default sending setting.  by default:
{
	async: false,
	dataType: 'json',
	contentType: 'application/json',
	xhrFields: {
		withCredentials: false
	},
	strategy: 'lazy'
}
TODO

## Contributing

We welcome all contributions, please submit any ideas as [pull requests](https://github.com/azl397985856/arida-fetch/pulls) or as a [GitHub issue](https://github.com/azl397985856/arida-fetch/issues).
## Licence
MIT
