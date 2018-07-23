var mqtt=require('mqtt');
var mongodb=require('mongodb');  
var mongodbClient=mongodb.MongoClient;  
var mongodbURI='mongodb://localhost:27017/testerino_one'  
var deviceRoot='Puerta' //Topic
var collection,client;  

var app = require('express')();
var http = require('http').Server(app);


//Conexion con MONGODB
mongodbClient.connect(mongodbURI,setupCollection);

function setupCollection(err,db) {  
  if(err) throw err;

  var client = mqtt.connect({host: 'localhost', port: 1883}); 
  console.log("Conectado a MQTT");

  var io = require('socket.io')(http);

  io.on('connection', function(socket) { // Whenever a new client is connected, this event is triggered
      console.log("Un nuevo cliente se ha conectado!", socket.id);
      socket.on('disconnect', function(socket) {
          console.log("El cliente", socket.id, "se ha desconectado");
      });
  });

  client.on('message', function (deviceRoot, message) {
    io.emit('live', message.toString());  // io.emit(channel, message);
    // Broadcasts message to all client instance's that are subscribed to 'live' channel.
  });

  collection=db.collection("Rafa");
  console.log("Entrando en la base de datos 'testerino_one");

 //Suscribiendose
  client.subscribe(deviceRoot)
  console.log("Suscrito a", deviceRoot);

  //Guardando en MongoDB
  
  client.on('message', function (deviceRoot, message) {
    let holi = JSON.parse(message);  //Convierte el buffer a JSON
    collection.insert({
      holi
    }
   )
  });
}

http.listen(3000, function(){
  console.log('listening on *:3000');
});
