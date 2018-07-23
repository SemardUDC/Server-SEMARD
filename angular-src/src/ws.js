var socket = io('http://localhost:3000');
  socket.on('live', function (data) { // This event is triggered when server publishes data to 'live' channel
    console.log(data);
  });