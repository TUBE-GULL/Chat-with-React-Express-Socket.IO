import React, { useEffect } from 'react';
import './App.css'
import Background from './components/Background/Background.jsx'

//Modules from rendering list 
import Main from './components/Main/Main.jsx'
import Login from './components/login/Login.jsx';
import socket from './components/socket.js';

function App() {

  useEffect(() => {

    socket.on('connect', () => {
      console.log('connect to server!');
    });

    // socket.on('message', (data) => {
    //   console.log('Получено сообщение от сервера:', data.text);
    // });

    // socket.emit('message', { text: 'Привет от клиента!' });

    return () => {
      console.log('disconnect to server');
      socket.on('disconnect');
    };
  }, []);


  return (
    <>
      <Background />
      <Login></Login>
    </>
  )
}

export default App
