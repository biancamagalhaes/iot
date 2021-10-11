var net = require('net');
const fs = require('fs');
var trucksAvailable = [];
var containersWaiting = [];

var server = net.createServer(function (socket) {
  handleState(socket);
});

try {  
  var data = fs.readFileSync('connections.txt', 'utf8');
  var devices = data.toString().split('\n'); 
  devices = devices.map((x) => {
    return {
      id: x.split(' ')[0],
      address: x.split(' ')[1],
      port: x.split(' ')[2],
    }
  });
} catch(e) {
    console.log('Error:', e.stack);
}

const handleState = (socket) => {
  socket.on('close', () => {
    console.log('CONEXÃO PERDIDA'); 
  })

  socket.on('data', (message) => {
    var name = message.toString().split(' ')[0];

    if(name === 'LIVRE' || name === 'COLETA_FINALIZADA'){
      if(name === 'COLETA_FINALIZADA'){
        console.log('Finished collection: ', message.toString().split(' ')[1]);
      }
      console.log('Truck Available: ', message.toString().split(' ')[1]);
      trucksAvailable.push(message.toString().split(' ')[1]);
    }

    if(name === 'CHEIO'){
      console.log('Container Full: ', message.toString().split(' ')[1]);
      if( trucksAvailable.length > 0 ){
        sendMessage(trucksAvailable[0], 'COLETAR ' + message.toString().split(' ')[1]);
        trucksAvailable.shift();
      }else{
        console.log('Container Waiting: ', message.toString().split(' ')[1]);
        containersWaiting.push(message.toString().split(' ')[1]);
        let findTruck = setInterval(() => {
          if(trucksAvailable.length > 0 ){
            sendMessage(trucksAvailable[0], 'COLETAR ' + containersWaiting[0]);
            trucksAvailable.shift();
            containersWaiting.shift();
            clearInterval(findTruck);
          }
        }, 10000);
      }
    }
  });
};

const sendMessage = (id, message) => {
  let device = devices.find(x => x.id == id);  
  var client = net.connect(device.port, device.address);
  client.setEncoding('utf8');
  setTimeout(function() { 
    console.log("Sending message to truck " + id + " ....");
    var res = client.write(message+'\n');
    console.log("Message sent: ", res)
  }, 2000);
}

server.listen(8000, '127.0.0.1');