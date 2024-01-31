import './Messenger.scss'
import styles from './Messenger.module.scss';
import React, { Context, useEffect, useState } from 'react';
import PersonalArea from './components/PersonalArea/PersonalArea';
import io from 'socket.io-client'
import { LoginMessenger } from '../../App';

const Messenger = () => {
   const { messengerFormData } = useContext(LoginMessenger);

   const socket = io('http://localhost:8080', {
      cors: { origin: "*", methods: ["GET", "POST"] },
      reconnection: false,
      reconnectionAttempts: 0,
      // query: { userInfo: id }
   });

   const [userInfo, setUserInfo] = useState({
      firstName: '',
      lastName: '',
      id: '',
   })

   console.log(messengerFormData)

   useEffect(() => {
      socket.on('testConnect', ({ message }) => {
         console.log(message)
      })

      socket.on('userInfo', (user) => {
         console.log('Получено сообщение от сервера:', user);
         setUserInfo({
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id
         });
      });


      socket.on('disconnect', () => {
         console.log('Disconnect with server');
         // Дополнительные действия при разрыве соединения, если необходимо
      });

      // Очистка слушателя событий при размонтировании компонента
      return () => {
         socket.off('userInfo');
         socket.off('testConnect');
         socket.off('disconnect');
      };
   }, [socket]);


   return (
      <div className={styles.Main}>

         {/* {Friend list} */}
         <header className={styles.header}>
            <h1 className={styles.headerH1}>Friend list</h1>
            <div className={styles.Friend_list}>

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