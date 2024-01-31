import React, { Context, useEffect, useState } from 'react';
import './App.css'
import Background from './components/Background/Background.jsx'

//Modules from rendering list 
import Messenger from './components/Messenger/Messenger.jsx'
import Login from './components/authorization/Login.jsx';

export const LoginMessenger = React.createContext()

function App() {

  // const socket = io('http://localhost:8080', { cors: { origin: "*", methods: ["GET", "POST"] } });
  const [showLogin, setShowLogin] = useState(true);
  const [messengerFormData, setMessengerFormData] = useState('');

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
  //   setBoxShadowBack('');
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
  // console.log(showLogin);


  // return (
  //   <>
  //     <Background />
  //     {showLogin && <Login />}
  //     {!showLogin && <Messenger />}
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
      <LoginMessenger.Provider value={{ showLogin, setShowLogin, messengerFormData, setMessengerFormData }}>
        {showLogin && <Login />}
        {!showLogin && <Messenger />}
      </LoginMessenger.Provider>
    </>
  );

}

export default App
