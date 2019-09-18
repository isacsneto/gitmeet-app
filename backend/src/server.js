const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const httpServer = express();
const server = require('http').Server(httpServer);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;
    connectedUsers[user] = socket.id;
});

mongoose.connect('mongodb+srv://<username>:<password>@cluster0-yqme3.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

httpServer.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

httpServer.use(cors());
httpServer.use(express.json());
httpServer.use(routes);

server.listen(8140);
