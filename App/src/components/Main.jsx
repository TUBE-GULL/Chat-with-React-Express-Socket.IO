import styles from './Main.module.scss';

const Main = () => {

   return (
      <biv className={styles.Main}>

         {/* {Friend list} */}
         <header className={styles.header}>
            <h1 className={styles.headerH1}>Friend list</h1>
            <div className={styles.Friend_list}>

            </div>
         </header>

         <main className={styles.main}>
            <h1 className={styles.mainH1}>Window-chat</h1>
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
      </biv>
   )
}

export default Main