var net = require('net');
var prompt = require('prompt');
var connectedDevices = [];
var nameServer = 'servidor_bianca';
var state = 'ATIVADO';

prompt.start();

console.log('O servidor está ATIVO [true/false]?');
prompt.get('isActive', function (err, result) {
    if (err) { return onErr(err); }
    if(result.isActive === 'true'){
      state = 'ATIVADO'
    }else{
      state = 'DESATIVADO'
    }
  });

var server = net.createServer();

server.on('connection', (connect) => {

  connect.on('data', (message) => {

    var remoteAddress = connect.remoteAddress;
    var remotePort = connect.remotePort;
    
    var name = message.toString().split(' ')[0];

    if(!connectedDevices.some(e => e.name === name)){
      console.log(message.toString());
      var string = (nameServer + ' ' + state + ' 40').toString();
      connect.write(string);
    }
    
    connectedDevices.push({name, address: remoteAddress + ': ' + remotePort});

    setInterval(() => {
      var temperature = Math.random();
      connect.write(temperature.toString() + '° C');
    }, 40000);

  });

  connect.on('close', () => {
    console.log('connection closed')
  })
})

server.listen(8000, '127.0.0.1');