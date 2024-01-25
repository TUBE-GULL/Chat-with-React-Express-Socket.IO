import './Main.scss'
import styles from './Main.module.scss';
import React, { useState } from 'react';
import socket from '../socket';
import PersonalArea from './components/PersonalArea/PersonalArea';


const Main = () => {
   const [userInfo, setUserInfo] = useState('')

   socket.on('info', (data) => {
      setUserInfo(data)
   })

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
               <PersonalArea data={userInfo} />
               <PersonalArea data={userInfo} />
               <PersonalArea data={userInfo} />
               <PersonalArea data={userInfo} />
               <PersonalArea data={userInfo} />
               <PersonalArea data={userInfo} />
               <PersonalArea data={userInfo} />
               <PersonalArea data={userInfo} />
               <PersonalArea data={userInfo} />
               <PersonalArea data={userInfo} />
               <PersonalArea data={userInfo} />
               <PersonalArea data={userInfo} />
               <PersonalArea data={userInfo} />
               <PersonalArea data={userInfo} />
            </div>
         </footer>
      </div>
   )
}

export default Main