var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function(req, res){
    res.sendfile('index.html');
});
io.configure(function () {
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);
});
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('new message', msg);
    });
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

var port = process.env.PORT || 3000
server.listen(port, function(){
    console.log('listening on *:3000');
});