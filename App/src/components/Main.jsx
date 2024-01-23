import React, { useEffect } from 'react';
import io from 'socket.io-client';
import styles from './Main.module.scss';

const socket = io('http://localhost:8080');

const Main = () => {

   useEffect(() => {

      socket.on('connect', () => {
         console.log('Подключено к серверу');
      });

      socket.on('disconnect', () => {
         console.log('Отключено от сервера');
      });

      socket.on('message', (data) => {
         console.log('Получено сообщение от сервера:', data.text);
      });

      socket.emit('message', { text: 'Привет от клиента!' });

      return () => {
         console.log('Компонент размонтирован');
         socket.disconnect();
      };
   }, []);


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

            </div>
         </footer>
      </div>
   )
}

export default Main