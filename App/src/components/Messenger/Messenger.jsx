import './Messenger.scss';
import styles from './Messenger.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import PersonalArea from './components/PersonalArea/PersonalArea';
import io from 'socket.io-client';
import { LoginMessenger } from '../../App';

const Messenger = () => {
   const { messengerFormData } = useContext(LoginMessenger);
   const [socket, setSocket] = useState(null);
   const [userInfo, setUserInfo] = useState([]);
   const [usersOnline, setUsersOnline] = useState([]);
   useEffect(() => {
      const newSocket = io('http://localhost:8080', {
         cors: { origin: "*", methods: ["GET", "POST"] },
         reconnection: false,
         reconnectionAttempts: 0,
      });

      setSocket(newSocket);

      const handleUsersUpdate = (usersOnline) => {
         setUsersOnline(usersOnline);
         console.log(usersOnline);
      };

      const handleConnectServer = (firstName, lastName, id) => {
         // console.log(firstName, lastName);
         setUserInfo(firstName, lastName, id);
      };

      const handleDisconnect = () => {
         console.log('Disconnect with server');
      };

      newSocket.on('connectServer', handleConnectServer);
      newSocket.on('disconnect', handleDisconnect);
      newSocket.on('usersOnline', handleUsersUpdate);
      newSocket.emit('send-info', messengerFormData);

      return () => {
         newSocket.off('connectServer', handleConnectServer);
         newSocket.off('usersOnline', handleUsersUpdate);
         newSocket.off('disconnect', handleDisconnect);
         newSocket.disconnect();
      };
   }, [messengerFormData]);


   return (
      <div className={styles.Main}>

         {/* {Friend list} */}
         <header className={styles.header}>
            <h1 className={styles.headerH1}>Friend list</h1>
            <div className={styles.Friend_list}>
               {/* {usersOnline.map((user, index) => {
                  console.log(user);
                  // < PersonalArea key={index} data={user} />
               })} */}

            </div>
         </header>

         <main className={styles.main}>
            <h1 className={styles.mainH1}>WindoW</h1>
            <div className={styles.windows_chat}>

               {/* {example sender} */}
               <div className={styles.sender}>
                  <h1>hi mom</h1>
               </div>

               {/* {example recipient} */}
               <div className={styles.recipient}>
                  <h1>hi dad</h1>
               </div>

            </div>

            <form className={styles.form}>
               <input className={styles.input} type='text'></input>
               <button className={styles.button}>Send</button>
            </form>
         </main>

         {/* {favorite friends} */}
         <footer className={styles.footer}>
            <div className={styles.favorite_friends}>
               <PersonalArea data={userInfo} />
            </div>
         </footer>
      </div>
   )
}

export default Messenger