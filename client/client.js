const
    io = require("socket.io-client"),
    ioClient = io.connect("https://ies-iot-1.herokuapp.com:8000");

ioClient.on("test", (msg) => console.log(msg));