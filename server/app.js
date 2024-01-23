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




io.on('connection', (socket) => {
   console.log(` ➜ \x1b[32mConnect New User:${socket}\x1b[0m`);

   socket.on('message', (data) => {
      console.log('Message received:', data);


      io.emit('message', { text: 'Hi from server!' });
   });

   socket.on('disconnect', () => {
      console.log('User disconnected');
   });
});









console.time(' ➜ \x1b[32mServer startup time:\x1b[0m');
server.listen(PORT, () => {

   console.log("         __             __     _____                              ");
   console.log("   _____/ /_____ ______/ /_   / ___/___  ______   _____  _____    ");
   console.log("  / ___/ __/ __ `/ ___/ __/   \\__ \\/ _ \\/ ___| | / / _ \\/ ___/    ");
   console.log(" (__  / /_/ /_/ / /  / /_    ___/ /  __/ /   | |/ /  __/ /        ");
   console.log("/____/\\__/\\__,_/_/   \\__/   /____/\\___/_/    |___/\\___/_/         ");
   console.log("                                                                  ");

   console.timeEnd(' ➜ \x1b[32mServer startup time:\x1b[0m');
   console.log(` ➜ \x1b[32mLocal: \x1b[4mhttp://localhost:${PORT}/\x1b[0m`);
});
