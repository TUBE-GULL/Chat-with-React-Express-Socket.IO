import styles from './Background.module.scss';

const Background = ({ backgroundColor, boxShadowFront, boxShadowBack, border }) => {

   return (
      <div className={styles.MainBlock} >
         <div className={styles.Up} style={{ backgroundColor, boxShadow: boxShadowFront }}></div>
         <div className={styles.UpOne_Back} style={{ backgroundColor, boxShadow: boxShadowBack, border }}></div>
         <div className={styles.UpTwo_Back} style={{ boxShadow: boxShadowBack, border }}></div>
         <div className={styles.Down} style={{ backgroundColor, boxShadow: boxShadowFront }}></div>
         <div className={styles.DownOne_Back} style={{ backgroundColor, boxShadow: boxShadowBack, border }}></div>
         <div className={styles.DownTwo_Back} style={{ boxShadow: boxShadowBack, border }}></div>
      </div>
   );
};

export default Background;
