'use strict';

const fetch = require('node-fetch');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const s3 = new AWS.S3();

const request = require('request');
const async = require('async');

module.exports.import = (event, context, callback) => {
  
  var count = 1;
  var MIN = 1;
  var MAX = 100;
  function getRandom() {
    return Math.random() * (MAX - MIN) + MIN;
  }
  var URL = "https://caif9vt4h5.execute-api.us-east-1.amazonaws.com/test/events";
  async.whilst(function (cb) {
    return cb(null, count <= 100000);
  },
  function (next) {
    var obj = {
      time : new Date().toISOString(),
      entity : "e1",
      value : getRandom(),
      tenant : "tenant1",
      datastream : "datastream1",
      signal: "signal1"
    }
    console.log(JSON.stringify(obj));
    request({ url : URL, method : "POST", json : obj}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body)
      } else {
        console.error(err);
      }
      count++;
      setTimeout(function(){
        next();
      }, 10);  
    });
  },
  function (err) {
    console.log("done", err);
    // All things are done!
  });
};