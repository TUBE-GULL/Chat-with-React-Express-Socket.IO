import React, { useEffect, useState } from 'react';
import './App.css'
import Background from './components/Background/Background.jsx'

//Modules from rendering list 
import Main from './components/Main/Main.jsx'
import Login from './components/login/Login.jsx';
import socket from './components/socket.js';
import Notifications from './components/notifications/Notifications.jsx'

function App() {

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const showTemporaryNotification = (message, duration = 2000) => {
    setNotificationMessage(message);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
      setNotificationMessage(''); // Очистите сообщение после скрытия
    }, duration);
  };

  useEffect(() => {

    socket.on('connect', () => {
      console.log('connect to server!');
    });

    socket.on('startMessage', (data) => {
      console.log('start message ! )' + data)
    })

    socket.on('returnLogin', (data) => {
      showTemporaryNotification(data.message, 10000);
    });

    // socket.on('message', (data) => {
    //   console.log('Получено сообщение от сервера:', data.text);
    // });

    // socket.emit('message', { text: 'Привет от клиента!' });

    return () => {
      socket.on('disconnect');
    };
  }, []);


  return (
    <>
      <Background />
      <Login></Login>
      {showNotification && <Notifications message={notificationMessage} />}
    </>
  )
}

export default App
