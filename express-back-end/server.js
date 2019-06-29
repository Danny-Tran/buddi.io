const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
server = App.listen(PORT,()=>{
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
})
const socket = require('socket.io');
io = socket(server)
let online = 0;


io.on('connection',(socket) =>{
  console.log('SERVER MESSAGE')
  console.log(socket.id)
  online++ ;
  
  io.sockets.emit('userCount', { userCount: online });
  console.log(online);

  socket.on('SEND_MESSAGE', function(data){
    io.emit('RECEIVE_MESSAGE', data);
  })

  socket.on('state', (data) => {
  	
  	socket.broadcast.emit('onPause', data);
  	console.log('FROM BACKEND', data);
  })

  // socket.on('receive', (data) => {
  // 	if(data == 1) {
  //   	socket.broadcast.emit('command', data);
	 //  } else if (data == 2) {
	 //  	socket.broadcast.emit('command', data);
	 //  }
	 //  	console.log('Listening to PLAY', data);
	 //  }
  // });

  socket.on('youtube_onPlay', (data) => {
  	console.log('Listening to PLAY', data);
    socket.broadcast.emit('youtube_playVideo', { ...data, socketId: socket.id });
  });

  socket.on('youtube_onPause', (data) => {
    console.log('Listening to PAUSE',data);
    socket.broadcast.emit('youtube_pauseVideo', data)
  });

  // socket.on('youtube_onPlay', (data) => {
  //   socket.broadcast.emit('seek_playVideo', data)
  //   console.log('Listening to PAUSE',data);
  // });

  socket.on('webcam', (data) => {
    console.log('Webcam on', data);
    socket.broadcast.emit('webcam_stream', data)
  });

})

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(Express.static('public'));

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));



