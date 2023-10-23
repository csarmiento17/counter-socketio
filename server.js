import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
  next();
});
const server = createServer();
const sio = new Server(server);

let ctr = 0;
sio.on('connection', (socket) => {
  socket.emit('counter', ctr);

  socket.on('clicked', () => {
    ctr++;
  });

  sio.emit('counter', ctr);
});

const PORT = 5000;

app.listen(PORT, () => console.log('server running!'));
