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

const usersData = await readFileData();

const UsersOnline = [];

app.use(express.json());
app.use(express.static(getAbsolutePath('../App/dist')));

app.get('/', (req, res) => {
   res.sendFile(getAbsolutePath('../App/dist/index.html'));
});

app.post('/submit_singUp', (req, res) => {
   singUp(req, res);
});

app.post('/submit_singIn', (req, res) => {
   singIn(req, res);
   const formData = req.body;
   const userData = usersData.find(el => el.firstName === formData.firstName)
   console.log('connect:' + userData)

});

io.on('connection', (socket) => {

   console.log('Users Online:' + UsersOnline)

   UsersOnline[socket.id] = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      socketId: socket.id
   };

   //       socket.emit('userData', { user, socketId: socket.id });
   socket.emit('userData', {
      user: {
         firstName: userData.firstName,
         lastName: userData.lastName
      }, socketId: socket.id
   });

   socket.on('disconnect', () => {
      console.log('User disconnected');
      delete UsersOnline[socket.id];
   });
});

const dataMessages = [
   {
      sender: ['firstName', 'lastName'],
      message: 'text',
      time: '22:22'
      // getFormattedDateTime()
   }
];


console.time(' ➜ \x1b[32mServer startup time:\x1b[0m');
server.listen(PORT, () => {
   logs();
   console.log(` ➜ \x1b[32mLocal: \x1b[4mhttp://localhost:${PORT}/\x1b[0m`);
   console.timeEnd(' ➜ \x1b[32mServer startup time:\x1b[0m');
});
