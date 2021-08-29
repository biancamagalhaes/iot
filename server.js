const express = require('express');
const { Server } = require("socket.io");
const io = new Server(server);
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('IOT1')
})

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.listen(port, () => {
  console.log(`Example app listening at https://ies-iot-1.herokuapp.com:8080`)
})