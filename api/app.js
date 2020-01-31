'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const controllers = require('./controllers');

app.use(bodyParser.json());

http.listen(3000, function() {
    console.log('listening');
});

io.on('connection', function(socket) {
    console.log('client connected');
    
    socket.on('addSinger', async function(req) {
        console.log('test complete');
        let response = await controllers.addSinger(JSON.parse(req));
        io.emit('singerAdded', response);
    });

    socket.on('addRecordLabel', async function(req) {
        console.log('test complete');
        let response = await controllers.addRecordLabel(JSON.parse(req));
        io.emit('recordLabelAdded', response);
    });

    socket.on('addStreamingService', async function(req) {
        console.log('test complete');
        let response = await controllers.addStreamingService(JSON.parse(req));
        io.emit('streamingServiceAdded', response);
    });

    socket.on('addSong', async function(req) {
        console.log('test complete');
        let response = await controllers.addSong(JSON.parse(req));
        io.emit('songAdded', response);
    });

    socket.on('changeSong', async function(req) {
        console.log('test complete');
        let response = await controllers.changeSong(JSON.parse(req));
        io.emit('songChanged', response);
    });

    socket.on('getKey', async function(req) {
        console.log('test complete');
        let response = await controllers.getKey(JSON.parse(req));
        io.emit('keyRetrieved', response);
    });

    socket.on('getAllAccounts', async function() {
        console.log('test complete');
        let response = await controllers.getAllAccounts();
        io.emit('singerAdded', response);
    });
});