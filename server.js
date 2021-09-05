var net = require('net');

var server = net.createServer();
server.on('connection', (connect) => {
  connect.on('data', (message) => {
    console.log(message);
    connect.write('Você conseguiu se conectar, sua mensagem: ', message);
  });

  connect.on('close', () => {
    console.log('connection closed')
  })
})

server.listen(8000, '127.0.0.1');