var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function(req, res){
    res.sendfile('index.html');
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


server.listen(3000, function(){
    console.log('listening on *:3000');
});