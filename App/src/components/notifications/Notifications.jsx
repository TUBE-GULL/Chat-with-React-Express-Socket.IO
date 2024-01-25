import style from './Notifications.module.scss';

const Notifications = ({ message }) => {
   return (
      <div className={style.Notifications}>
         <h1 className={style.NotificationsH1}>{message}</h1>
      </div>
   );
};

export default Notifications;
