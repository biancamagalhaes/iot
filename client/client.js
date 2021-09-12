var prompt = require('prompt')
var net = require('net');
var fs = require('fs');
var nameServer = 'servidor_bianca';

const connect = (ip, port, name) => {
	var client = new net.Socket();
	
	client.connect(parseInt(port), ip, function() {
		console.log('Connected');
		client.write(nameServer + ' CONECTAR ' + name);
	});

	client.on('data', function(data) {
		console.log('Received: ' + data);
		client.destroy();
	});

	client.on('close', function() {
		console.log('Connection closed');
	});
}

prompt.start();

try {  
    var data = fs.readFileSync('lista_dispositivos.txt', 'utf8');
	var devices = data.toString().split('\r\n'); 
} catch(e) {
    console.log('Error:', e.stack);
}

prompt.get('initialCommand', function (err, result) {
    if (err) { return onErr(err); }
	var variables = result.initialCommand.split(' ');
	if(variables[1] == 'CONECTAR'){
		if(variables[0] == nameServer){
			var existDevice = devices.find(device => {
				if(device.split(' ')[0] === variables[2]){
					return true
				}
			});

			if(existDevice){
				connect(existDevice.split(' ')[1], existDevice.split(' ')[2]);
			}else{
				console.log('Device nâo está listado');
			}
		}
		
	}
});



function onErr(err) {
    console.log(err);
    return 1;
}

