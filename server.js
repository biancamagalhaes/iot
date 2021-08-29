const
    {Server} = require("socket.io"),
    server = new Server(8000);


server.on('connection', function(socket){
  console.info(`Client connected [id=${socket.id}]`);
  socket.emit('test', 'uma mensagem');
});
