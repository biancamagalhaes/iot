var net = require('net');
var connectedDevices = [];
var nameServer = 'servidor_bianca';
var state = 'ATIVADO';

var server = net.createServer();
server.on('connection', (connect) => {

  connect.on('data', (message) => {
    
    var name = message.toString().split(' ')[0];

    if(!connectedDevices.includes(name)){
      console.log(message.toString());
      var string = (nameServer + ' ' + state + ' 40').toString();
      connect.write(string);
      connectedDevices.push(name);
    }

  });

  connect.on('close', () => {
    console.log('connection closed')
  })
})

server.listen(8000, '127.0.0.1');