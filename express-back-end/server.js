const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
server = App.listen(PORT,()=>{
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
})
const socket = require('socket.io');
io = socket(server)

io.on('connection',(socket) =>{
  console.log('SERVER MESSAGE')
  console.log(socket.id)

  socket.on('SEND_MESSAGE', function(data){
    io.emit('RECEIVE_MESSAGE', data);
  })

  socket.on('state', (data) =>{
  	
  	socket.broadcast.emit('onPause', data);
  	console.log('FROM BACKEND', data);
  })
})

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(Express.static('public'));

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));



