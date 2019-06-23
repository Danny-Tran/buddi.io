const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 3001;
const SocketServer = require('ws').Server;

const server = Express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(Express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
  

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(Express.static('public'));

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

// App.listen(PORT, () => {
//   // eslint-disable-next-line no-console
//   console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
// });

const wss = new SocketServer({ server });
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send("hello worldhgjhgjhg ")

});//wss connections
