import styles from './Background.module.scss';

const Background = () => {

   return (
      <div id="Background" className={styles.Background}>
         <div id="element_Background_One" className={styles.One}></div>
         <div id="element_Background_One_Back" className={styles.One_Back}></div>
         <div id="element_Background_OneTwo_Back" className={styles.OneTwo_Back}></div>
         <div id="element_Background_Two" className={styles.Two} > </div>
         <div id="element_Background_Two_Back" className={styles.Two_Back}></div>
         <div id="element_Background_OneTwo_Back" className={styles.TwoTwo_Back}></div>
      </div>
   );
};

export default Background;
