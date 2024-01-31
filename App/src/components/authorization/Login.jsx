import style from './Login.module.scss';
import { useState, useContext } from "react";
import InputModule from "./InputModule";
import Notifications from "../notifications/Notifications";
import io from 'socket.io-client'
import { LoginMessenger } from '../../App';

const Login = () => {
   const { showLogin, setShowLogin } = useContext(LoginMessenger);
   const { setMessengerFormData } = useContext(LoginMessenger);
   const [isRegistering, setIsRegistering] = useState(true);
   const [showNotification, setShowNotification] = useState(false);
   const [notificationMessage, setNotificationMessage] = useState('');
   const [loginFormData, setLoginFormData] = useState({
      firstName: '',
      password: '',
   });

   const [registeringFormData, setRegisteringFormData] = useState({
      firstName: '',
      lastName: '',
      registerPassword: '',
      confirmPassword: '',
   });

   const textHTwoSignIn = ['Already have an account?', 'Sign in']
   const inputArraySignIn = [{
      type: 'text',
      name: 'firstName',
      value: loginFormData.firstName,
      onChange: (e) => handleChange(e, 'firstName'),
      placeholder: "Your First Name:",
   },
   {
      type: 'password',
      name: 'password',
      value: loginFormData.password,
      onChange: (e) => handleChange(e, 'password'),
      placeholder: "Password:",
   }];

   const inputArraySignUp = [{
      type: 'text',
      name: 'firstName',
      value: registeringFormData.firstName,
      onChange: (e) => handleChange(e, 'firstName'),
      placeholder: "First Name:",
   },
   {
      type: 'text',
      name: 'lastName',
      value: registeringFormData.lastName,
      onChange: (e) => handleChange(e, 'lastName'),
      placeholder: "Last Name:",
   },
   {
      type: 'password',
      name: 'registerPassword',
      value: registeringFormData.registerPassword,
      onChange: (e) => handleChange(e, 'registerPassword'),
      placeholder: "Register Password:",
   },
   {
      type: 'password',
      name: 'confirmPassword',
      value: registeringFormData.confirmPassword,
      onChange: (e) => handleChange(e, 'confirmPassword'),
      placeholder: "Confirm Password:",
   }];

   const textHTwoSignUp = ['Don\'t have an account ? ', 'Register']

   const handleToggleForm = () => {
      setIsRegistering(!isRegistering);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;

      if (isRegistering) {
         setLoginFormData((prevData) => ({ ...prevData, [name]: value }));
      } else {
         setRegisteringFormData((prevData) => ({ ...prevData, [name]: value }));
      }
   };

   const showTemporaryNotification = (message, duration = 2000) => {
      setNotificationMessage(message);
      setShowNotification(true);

      setTimeout(() => {
         setShowNotification(false);
         setNotificationMessage('');
      }, duration);
   };

   const sendFormToServer = async (formData, post) => {
      try {
         const response = await fetch(`${post}`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
         })
         const result = await response.json();
         if (post === '/api/submit_singIn') {

            if (result.error) {
               showTemporaryNotification('Wrong login or password', 5000);
            } else {
               const socket = io('http://localhost:8080', { cors: { origin: "*", methods: ["GET", "POST"] } });
               // socket.emit('singIn', formData);
               setMessengerFormData(formData);
               setShowLogin(!showLogin);
            }
            console.time('end');
         } else {

            if (result.error) {
               showTemporaryNotification('Failed to log in', 5000);
            } else {
               showTemporaryNotification('authorization was successful', 5000);
               setIsRegistering(!isRegistering);
            }
            console.time('end');

         }
      } catch (error) {
         console.log(error.message);
         showTemporaryNotification('An error occurred while sending data', 5000);
      }
   };

   const checkSubmit = (object) => {
      return Object.values(object).every(value => value.trim() !== '');
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      //send data in server 
      if (isRegistering) {//sing in
         checkSubmit(loginFormData)//check form  to blank text
            ? await sendFormToServer(loginFormData, '/api/submit_singIn')
            : showTemporaryNotification('unfilled form ', 3000);
      } else {//sing up
         if (checkSubmit(registeringFormData)) {//check form  to blank text
            if (registeringFormData.registerPassword === registeringFormData.confirmPassword) {
               console.log(registeringFormData.registerPassword);
               console.log(registeringFormData.confirmPassword);

               const formData = {// if register confirm password true send data
                  firstName: registeringFormData.firstName,
                  lastName: registeringFormData.lastName,
                  password: registeringFormData.registerPassword,
               };
               await sendFormToServer(formData, '/api/submit_singUp');
            } else {
               showTemporaryNotification('passwords don\'t match', 3000);
            };
         } else {
            showTemporaryNotification('unfilled form', 3000);
         };
      };

      setLoginFormData({
         firstName: '',
         password: '',
      });

      setRegisteringFormData({
         firstName: '',
         lastName: '',
         registerPassword: '',
         confirmPassword: '',
      });
   };

   return (
      <div className={style.Login}>
         <form className={style.LoginForm} onSubmit={handleSubmit}>
            <div>
               <h1 className={style.h1}>{isRegistering ? 'ACCOUNT SIGN IN' : 'CREATE AN ACCOUNT'}</h1>
               {isRegistering
                  ? inputArraySignIn.map((el, index) => (
                     <InputModule key={index} {...el} />
                  ))
                  : inputArraySignUp.map((el, index) => (
                     <InputModule key={index} {...el} />
                  ))}
               <button type="submit">{isRegistering ? 'SIGN IN' : 'CREATE ACCOUNT'}</button>
            </div>
            <h2 className={style.h2}>
               {isRegistering ? textHTwoSignIn[0] : textHTwoSignUp[0]}
               <a className={style.isRegistering} onClick={handleToggleForm}>
                  {isRegistering ? textHTwoSignIn[1] : textHTwoSignUp[1]}
               </a>
            </h2>
         </form>
         {showNotification && <Notifications message={notificationMessage} />}
      </div>
   );
};

export default Login;
