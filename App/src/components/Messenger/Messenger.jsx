import './Messenger.scss';
import styles from './Messenger.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import PersonalArea from './components/PersonalArea';
import io from 'socket.io-client';
import { LoginMessenger } from '../../App';
import Messages from './components/Messages';
import ElementList from './components/ElementList'
// import EmojiPicker from './components/Picker';

const Messenger = () => {
   const { messengerFormData } = useContext(LoginMessenger);
   const [socket, setSocket] = useState(null);
   const [userInfo, setUserInfo] = useState([]);
   const [usersOnline, setUsersOnline] = useState({});
   const [messageInput, setMessageInput] = useState('');
   const [messages, setMessages] = useState([]);

   const handleChange = (e) => {
      const { value } = e.target;
      setMessageInput(value);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const message = {
         sender: [userInfo.firstName, userInfo.lastName],
         message: messageInput
      };
      socket.emit('sendMessage', message);

      setMessageInput('');
   };

   useEffect(() => {
      const newSocket = io('http://localhost:8080', {
         cors: { origin: "*", methods: ["GET", "POST"] },
         reconnection: false,
         reconnectionAttempts: 0,
      });

      setSocket(newSocket);

      const handleMessageUpdate = (exportMessage) => {
         setMessages((prevMessages) => [...prevMessages, exportMessage]);
      };

      const handleUsersUpdate = (usersOnline) => {
         setUsersOnline(usersOnline);
         console.log(usersOnline);
      };

      const handleConnectServer = (firstName, lastName, id) => {
         setUserInfo(firstName, lastName, id);
      };

      const handleDisconnect = () => {
         console.log('Disconnect with server');
      };

      // const handleReconnect = () => {
      //    console.log('Reconnected to server');
      // };

      newSocket.on('sendEveryoneMessage', handleMessageUpdate);
      newSocket.on('connectServer', handleConnectServer);
      newSocket.on('disconnect', handleDisconnect);
      newSocket.on('usersOnline', handleUsersUpdate);
      newSocket.emit('send-info', messengerFormData);
      // newSocket.on('reconnect', handleReconnect);

      return () => {
         newSocket.off('sendEveryoneMessage', handleMessageUpdate);
         newSocket.off('connectServer', handleConnectServer);
         newSocket.off('usersOnline', handleUsersUpdate);
         newSocket.off('disconnect', handleDisconnect);
         // newSocket.off('reconnect', handleReconnect)
         newSocket.disconnect();
      };
   }, [messengerFormData]);


   return (
      <div className={styles.Main}>
         <div className={styles.container}>
            {/* {Friend list} */}
            <header className={styles.header}>
               <h1 className={styles.headerH1}>users online</h1>
               <div className={styles.Friend_list}>
                  {
                     Object.keys(usersOnline).map(key => {
                        if (usersOnline.hasOwnProperty(key)) {
                           const user = usersOnline[key];
                           return (
                              <ElementList key={key} data={user} />
                           );
                        }
                        return null;
                     })
                  }
               </div>

            </header>

            <main className={styles.main}>
               <h1 className={styles.mainH1}>Chat</h1>
               <div className={styles.windows_chat}>
                  {messages.map((sms, index) => {
                     console.log(messages);
                     return < Messages key={index} user={userInfo.firstName} message={sms} />
                  })}
               </div>
               <form className={styles.form} onSubmit={handleSubmit}>
                  {/* <EmojiPicker /> */}
                  <input className={styles.input}
                     type='text'
                     name='textMessage'
                     value={messageInput}
                     onChange={(e) => handleChange(e, 'textMessage')}
                     placeholder='write !'
                  ></input>
                  <button className={styles.button} type="submit">Send</button>
               </form>
            </main>

            {/* {favorite friends} */}
            {/* <footer className={styles.footer}>
            <div className={styles.favorite_friends}>
               <PersonalArea data={userInfo} />
            </div>
         </footer> */}

         </div>
      </div>
   )
}

export default Messenger