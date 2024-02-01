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

app.use(express.json());
app.use(express.static(getAbsolutePath('../App/dist')));

app.get('/', (req, res) => {
   res.sendFile(getAbsolutePath('../App/dist/index.html'));
});

app.post('/submit_singUp', (req, res) => {
   singUp(req, res);
});

app.post('/submit_singIn', (req, res) => {
   singIn(req, res)
});

const UsersOnline = {};

io.on('connection', (socket) => {

   socket.on('send-info', async messengerFormData => {
      console.log(messengerFormData);
      const userData = await readFileData();
      const user = userData.find(el => el.firstName === messengerFormData.firstName);
      socket.emit('connectServer', { firstName: user.firstName, lastName: user.lastName, id: user.id });

      UsersOnline[socket.id] = { firstName: user.firstName, lastName: user.lastName };

      io.emit('usersOnline', UsersOnline);
   });

   socket.on('sendMessage', message => {
      const exportMessage = message;
      exportMessage.time = new Date().toLocaleTimeString();
      console.log('Received message:', exportMessage);

      io.emit('sendEveryoneMessage', exportMessage);

   });

   socket.on('disconnect', () => {
      console.log('User disconnected' + socket.id);
      delete UsersOnline[socket.id];

      io.emit('usersOnline', UsersOnline);
   });
});

// const dataMessages = [
//    {
//       sender: ['firstName', 'lastName'],
//       message: 'text',
//       time: '22:22'
//       // getFormattedDateTime()
//    }
// ];

console.time(' ➜ \x1b[32mServer startup time:\x1b[0m');
server.listen(PORT, () => {
   logs();
   console.log(` ➜ \x1b[32mLocal: \x1b[4mhttp://localhost:${PORT}/\x1b[0m`);
   console.timeEnd(' ➜ \x1b[32mServer startup time:\x1b[0m');
});
