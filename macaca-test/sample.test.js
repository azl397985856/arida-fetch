'use strict';
var fetch = require('../lib/index.js');
var wd = require('webdriver-client')({
  platformName: 'desktop',
  browserName: 'chrome'
});

describe('core testsuite', function() {
  this.timeout(5 * 60 * 1000);
  const driver = wd.initPromiseChain();

  before(() => {
    return driver
      .initDriver()
      .setWindowSize(1280, 800);
  });

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
  

  it('#0 sequenceTasks should be send by the given sequence', function() {
      driver.
        get('http://azu.github.io/promises-book/json/comment.json');
      fetch.sequenceTasks([request.comment, request.people])
        .then(function (value) {
            console.log(value);
        }).catch(function(error){
            console.error(error);
        });
  });

  after((done) => {
    return driver
      .quit(done)
  });
});
