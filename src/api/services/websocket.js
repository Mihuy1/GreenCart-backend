import {WebSocketServer} from 'ws';

const server = new WebSocketServer({port: 8080});

server.on('connection', function connection(websocket) {
  console.info('Client connected');
  const interval = setInterval(() => {
    websocket.send('hello world');
  }, 1000);

  websocket.on('close', () => {
    console.log('Client disconnected');
  });

  websocket.onerror = function () {
    console.log('Some Error occurred');
  };
});
