import React, { Context, useEffect, useState } from 'react';
import './App.css'

//Modules from rendering list 
import Background from './components/Background/Background.jsx'
import Messenger from './components/Messenger/Messenger.jsx'
import Login from './components/authorization/Login.jsx';

export const LoginMessenger = React.createContext()

function App() {
  //function to change the background ================================================================
  const [backgroundColor, setBackgroundColor] = useState('rgba(163, 0, 255, 0.15)');
  const [boxShadowFront, setBoxShadowFront] = useState('0 8px 32px 0 rgba(31, 38, 135, 0.37)');
  const [boxShadowBack, setBoxShadowBack] = useState('0px 0px 90px 60px rgba(140, 0, 255, 0.40)');
  const [border, setBorder] = useState('2px solid #7303c0');

  const [showLogin, setShowLogin] = useState(true);
  const [messengerFormData, setMessengerFormData] = useState('');

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
