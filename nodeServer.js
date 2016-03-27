var WebSocketServer = require('ws');

clients = [];

var WebSocketServer = new WebSocketServer.Server({
    host: "localhost",
    port: 8081
});


WebSocketServer.on('connection' , function(ws){

    var id = 1 + Math.random();
    console.log("new connection " + id);
    for(var key in clients) {
        clients[key].send(id + "join to chat");
    }

    clients[id] = ws;
    clients[id].send("Hello " + id);


    ws.on('message', function(message) {
        console.log("Server get the message: " + message);

        for(var key in clients) {
            clients[key].send(id + " :" + message);
        }
    });

    ws.on('close', function() {
        console.log('Connection closed: id = ' + id );
        delete clients[id];
        for(var key in clients) {
            clients[key].send(id + " left the chat");
        }
    });

});