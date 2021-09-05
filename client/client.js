var net = require('net');

var client = new net.Socket();
client.connect(16102, '0.tcp.ngrok.io', function() {
	console.log('Connected');
	client.write('Me conectei no seu client, Bianca');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy();
});

client.on('close', function() {
	console.log('Connection closed');
});