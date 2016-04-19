## Introduction
A libabry for communicating with server. we send requests sychronously by default in case of occuring wired things. And combine your http request is supported. But it needs backend to analyze and response the serizable responses content.
## Install

```bash
npm install arida-fetch
```

## Usage example

``` javascript
impot fetch from 'arida-fetch';

fetch.push({
	url: 'http://www.itechnique.cn/get/1',
	mothod: 'get',
	setting: {
		strategy: 'lazy'
	}
});
fetch.push({
	url: 'http://www.itechnique.cn/get/2',
	mothod: 'get',
	setting: {
		strategy: 'lazy'
	}
});
```
Then two requets will be sent to the server on by one . each has an 500ms delay. For more information, plz check the API doc.

## API
The following is an incomplete list of arida-fetch API. It should give you a general concept of arida-fetch's usage.

- `.send(url, type || 'get', syc || true)`: send your request to server;
- `.push(param)`: push the request to the quene;
- `.batchSend(param)`: send the requests of the quene;
- `.setting: only default and lazy(sleep 500ms before per request) supported at present
TODO

## Contributing

We welcome all contributions, please submit any ideas as [pull requests](https://github.com/azl397985856/arida-fetch/pulls) or as a [GitHub issue](https://github.com/azl397985856/arida-fetch/issues).
## Licence
MIT
