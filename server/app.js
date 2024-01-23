import http from 'http';
import express from 'express';
import { Server } from 'socket.io'
import getAbsolutePath from './modules/getAbsolutePath.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });
const PORT = process.env.PORT || 8080;

app.use(express.static(getAbsolutePath('../App/dist')));

app.get('/', (req, res) => {
   res.sendFile(getAbsolutePath('../App/dist/index.html'));
});


console.time(' ➜ \x1b[32mServer startup time:\x1b[0m');
server.listen(PORT, () => {
   console.timeEnd(' ➜ \x1b[32mServer startup time:\x1b[0m');
   console.log(` ➜ \x1b[32mLocal: \x1b[4mhttp://localhost:${PORT}/\x1b[0m`);
});