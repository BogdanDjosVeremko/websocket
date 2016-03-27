window.onload = function () {
    var connectionStatus = document.getElementById("status");
    var message = document.getElementById("message");
    var sendButton = document.getElementById("send");
    var stopButton = document.getElementById("stop");

    //WebSocket.CONNECTING
    //WebSocket.OPEN
    //WebSocket.CLOSING
    //WebSocket.CLOSED

    sendButton.onclick = function () {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(message.value);
        }
    };

    stopButton.onclick = function () {
        if (socket.readyState === WebSocket.OPEN) {
            socket.close();
        }
    };

    var socket = new WebSocket("ws://echo.websocket.org");
    socket.onopen = function (event) {
        console.log("successful connection");
        connectionStatus.innerHTML = "Connection is open";
    };

    socket.onclose = function (event) {
        console.log("close connection");
        //var code = event.code;
        var reason = event.reason;
        var wasClean = event.wasClean;
        if (wasClean) {
            connectionStatus.innerHTML = "Connection close correctly";
        } else {
            connectionStatus.innerHTML = "Connection close incorrectly<br>Description: " + reason;
        }
    };

    socket.onerror = function (event) {
        console.log("Error");
    };

    socket.onmessage = function (event) {
        if (typeof event.data === "string") {
            connectionStatus.innerHTML = event.data;
        }
    };

};