import WebSocket from 'ws';

const wss = new WebSocket.Server({port: 8080});

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Simulate order status updates
  setInterval(() => {
    const orderId = Math.floor(Math.random() * 100) + 1;
    const status = Math.random() > 0.5 ? 'picked up' : 'completed';
    ws.send(JSON.stringify({orderId, status}));
  }, 5000);

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
