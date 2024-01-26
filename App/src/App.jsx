import React, { useEffect, useState } from 'react';
import './App.css'
import Background from './components/Background/Background.jsx'

//Modules from rendering list 
import Main from './components/Messanger/Main.jsx'
import Login from './components/authorization/Login.jsx';
import socket from './components/socket.js';
import Notifications from './components/notifications/Notifications.jsx'

function App() {

  // const socket = io('http://localhost:8080', { cors: { origin: "*", methods: ["GET", "POST"] } });



  //function to change the background ================================================================
  // const [] = useState()
  const [backgroundColor, setBackgroundColor] = useState('rgba(163, 0, 255, 0.15)');
  const [boxShadowFront, setBoxShadowFront] = useState('0 8px 32px 0 rgba(31, 38, 135, 0.37)');
  const [boxShadowBack, setBoxShadowBack] = useState('0px 0px 90px 60px rgba(140, 0, 255, 0.40)');
  const [border, setBorder] = useState('2px solid #7303c0');
  // const handleColorChange = () => {
  //   setBackgroundColor('');
  // };

  // const handleBoxShadowChange = () => {
  //   setBoxShadowFront('');
  //   setBoxShadowBack('')
  // };

  // const handleBorderChange = () => {
  //   setBorder('');
  // };

  //function to sing In and sind Up  ===================================================================
  //function to sing In and sind Up  ===================================================================

  // useEffect(() => {

  //   socket.on('connect', () => {
  //     console.log('connect to server!');
  //   });

  //   socket.on('startMessage', handleStartMessage)

  //   socket.on('Notifications', (data) => {
  //     showTemporaryNotification(data.message, 10000);
  //   });

  //   // socket.on('message', (data) => {
  //   //   console.log('Получено сообщение от сервера:', data.text);
  //   // });

  //   // socket.emit('message', { text: 'Привет от клиента!' });

  //   return () => {
  //     console.log('disconnect');
  //     socket.on('disconnect');
  //   };
  // }, []);



  // return (
  //   <>
  //     <Background />
  //     {showLogin && <Login />}
  //     {!showLogin && <Main />}
  //     {showNotification && <Notifications message={notificationMessage} />}
  //   </>
  // )
  return (
    <>
      <Background
        backgroundColor={backgroundColor}
        boxShadowFront={boxShadowFront}
        boxShadowBack={boxShadowBack}
        border={border} />
      <Login />
    </>
  )
}

export default App
