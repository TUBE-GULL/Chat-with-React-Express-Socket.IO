import http from 'http';
import express from 'express';
import { Server } from 'socket.io'

//modules
import logs from './modules/logs.js';
import { singUp, singIn } from './modules/singUpIn.js'
import getAbsolutePath from './modules/getAbsolutePath.js';
import readFileData from './modules/readFileData.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });
const PORT = process.env.PORT || 8080;

const userData = await readFileData();

app.use(express.static(getAbsolutePath('../App/dist')));

app.get('/', (req, res) => {
   res.sendFile(getAbsolutePath('../App/dist/index.html'));
});

const dataMessages = [
   {
      sender: ['firstName', 'lastName'],
      message: 'text',
      time: '22:22'
      // getFormattedDateTime()
   }
];

io.on('connection', (socket) => {
   console.log(` ➜ Connect New User: ${socket.id}`);

   socket.on('login', async (data) => {
      let dataUser = {};
      if (await singIn(data)) {
         userData.forEach(el => {
            if (el.firstName === data.firstName) {
               dataUser = {
                  socketId: el.id,
                  firstName: el.firstName,
                  lastName: el.lastName,
               };
            }
            socket.emit('startMessage', dataUser.socketId);
            socket.emit('info', dataUser);
         })
      } else {
         socket.emit('Notifications', { message: 'Wrong login or password' });
      }
   });

   socket.on('registering', async (data) => {
      console.log(data)
      if (await singUp(data)) {
         socket.emit('Notifications', { message: 'authorization was successful' })
         socket.emit('exitLogin', {})
      } else {
         socket.emit('Notifications', { message: 'Failed to log in' });
      }
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
