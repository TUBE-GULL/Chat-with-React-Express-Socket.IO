import React from 'react';
import styles from './Messages.module.scss';

const Messages = ({ user, message }) => {
   console.log(message);

   const sender = user === message.sender[0];

   return (
      <div className={sender ? styles.recipient : styles.sender}>
         <div className={styles.messageName}>
            <h1>{message.sender[0]}</h1>
            <h1>{message.sender[1]}</h1>
         </div>
         <p>{message.message}</p>
         <h3>{message.time}</h3>
      </div>
   );
}

export default Messages;

{/* {example recipient} */ }
{/* <div className={styles.recipient}> */ }


{/* {example sender} */ }
{/* <div className={styles.sender}> */ }
