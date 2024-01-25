import http from 'http';
import express from 'express';
import { Server } from 'socket.io'

//modules
import logs from './modules/logs.js';
import { singUp, singIn } from './modules/singUpIn.js'
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
   console.log(` ➜ Connect New User: ${socket.id}`);

   socket.on('login', async (data) => {
      await singIn(data)
         ? io.emit('startMessage', data)
         : io.emit('returnLogin', { message: 'wrong login or password' });
   });

   socket.on('registering', async (data) => {
      await singUp(data)
         ? io.emit('returnLogin', { message: 'authorization was successful' })
         : io.emit('returnRegistering', { message: 'Failed to log in' });
   });

   // socket.on('message', (data) => {
   //    console.log('Message received:', data);

   //    io.emit('message', { text: 'Hi from server!' });
   // });

   socket.on('disconnect', () => {
      console.log('User disconnected');
   });
});


console.time(' ➜ \x1b[32mServer startup time:\x1b[0m');
server.listen(PORT, () => {
   logs();
   console.timeEnd(' ➜ \x1b[32mServer startup time:\x1b[0m');
   console.log(` ➜ \x1b[32mLocal: \x1b[4mhttp://localhost:${PORT}/\x1b[0m`);
});
