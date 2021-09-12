var prompt = require('prompt')
var net = require('net');
var fs = require('fs');
var nameServer = 'servidor_bianca';

const connect = (device) => {
	var client = new net.Socket();
	
	client.connect(parseInt(device[2]), device[1], function() {
		var string = (nameServer + ' CONECTAR ' + device[0]).toString();
		client.write(string);
	});

	client.on('data', function(data) {
		console.log(data.toString());
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
				connect(existDevice.split(' '));
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

