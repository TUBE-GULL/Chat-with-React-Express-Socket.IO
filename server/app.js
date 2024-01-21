import http from 'http';
import express from 'express';
import { Server } from 'socket.io'
import getAbsolutePath from './modules/getAbsolutePath.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
   res.sendFile(getAbsolutePath('../chat/index.html'));
});

server.listen(PORT, () => {
   console.log(`Socket.IO + Start sever on port ${PORT}...`);
});