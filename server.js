const express = require('express'),
    path = require('path'),
    config = require('./config'),
    // routes = require('./routes'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    port = config.server.PORT,
    taskRepo = require('./dbLayer/repositories/taskRepo');

const MongoClient = require("mongodb").MongoClient;
const crypto = require("crypto");
const uri = "mongodb://localhost:27017/";

// Export app for other routes to use
let app = express(),
    http = require('http').Server(app);

// Starting point of the server
function main() {
    app.use(express.static(path.join(__dirname + '/public')));
    app.use(bodyParser.urlencoded({ // Middleware
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.json({type: 'application/vnd.api+json'}));
    app.use(methodOverride());

    try {
        MongoClient.connect(uri, (err, db) => {
            //task EP's
            app.post('/task', (req, res) => {
                taskRepo.post(db, {name: "Company Inc", address: "Highway 37"}, req, res);
            });

            app.get('/task', (req, res) => {
                taskRepo.get(db, {}, req, res);
            });

            app.put('/task', (req, res) => {
                taskRepo.put(db, {address: "Highway 37"}, {$set: {name: "Mickey", address: "Canyon 123"}}, req, res);
            });

            app.delete('/task', (req, res) => {
                taskRepo.delete(db, {address: "Canyon 123"}, req, res);
            });

            app.use(function (req, res) {
                res.status(404).send({url: req.originalUrl + ' not found'})
            });
        });
    } catch (e) {
        console.log("some Error has occured");
    }

    router.get('/', (req, res, next) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    let server = app.listen(port, (err) => {
        err ? console.log('Cannot connect...', err) : console.log(`Connected! Server is listening on port ${port}`);
    });

    const io = require("socket.io")(server);
    //listen on every connection
    io.on('connection', (socket) => {
        console.log('New user connected');

        //listen on change_username
        socket.on('change_username', (data) => {
            console.log('Username Changed');
            socket.username = data.username
        });

        //listen on new_message
        socket.on('new_message', (data) => {
            console.log('New Message detected');
            //broadcast the new message
            io.sockets.emit('new_message', {message: data.message, username: data.username|| socket.username});
        });

        //listen on typing
        socket.on('typing', (data) => {
            socket.broadcast.emit('typing', {username: data.username|| socket.username})
        });
    })
}
main();
