import style from './Login.module.scss';
import { useState } from "react";
import InputModule from "./InputModule";
import Notifications from "../notifications/Notifications";

const Login = () => {
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

   const inputArraySignUp = [
      {
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
      }
   ]

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
         const response = await fetch(post, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
         })
         const result = await response.json();
         if (post === '/submit_singIn') {

            if (result.error) {
               showTemporaryNotification('Wrong login or password', 5000);
            } else {
               // тут запуск мессаджера

            }
         } else {

            if (result.error) {
               showTemporaryNotification('authorization was successful', 5000);
            } else {
               //тут смена страницы с регистраци на вход 
               showTemporaryNotification('Failed to log in', 5000);
               setIsRegistering(!isRegistering);
            }
         }
      } catch (error) {
         console.log(error.message);
         showTemporaryNotification('An error occurred while sending data', 5000);
      }
   };

   const checkSubmit = (object) => {
      return Object.values(object).every(value => value.trim() !== '');
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      //send data in server 
      if (isRegistering) {//sing up
         if (checkSubmit(registeringFormData)) {//check form  to blank text
            const formData = {// if register confirm password true send data
               firstName: registeringFormData.firstName,
               lastName: registeringFormData.lastName,
               password: registeringFormData.registerPassword,
            }
            sendFormToServer(formData, '/submit_singUp')
         } else {
            showTemporaryNotification('passwords don\'t match', 5000);
         }
      } else {//sing in
         checkSubmit(loginFormData)//check form  to blank text
            ? sendFormToServer(formData, '/submit_singUp')
            : console.log('no text submit');
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


// import React, { useState } from 'react';
// import style from './Login.module.scss';
// import socket from '../socket';

// const Login = () => {
//    const [isRegistering, setIsRegistering] = useState(false);
//    const [passwordMatch, setPasswordMatch] = useState(['Register Password:', 'Confirm  Password:']);
//    const [loginFormData, setLoginFormData] = useState({
//       firstName: '',
//       password: '',
//    });

//    const [registeringFormData, setRegisteringFormData] = useState({
//       firstName: '',
//       lastName: '',
//       registerPassword: '',
//       confirmPassword: '',
//    });

//    const handleChange = (e) => {
//       const { name, value } = e.target;

//       if (isRegistering) {
//          setRegisteringFormData((prevData) => ({ ...prevData, [name]: value }));
//       } else {
//          setLoginFormData((prevData) => ({ ...prevData, [name]: value }));
//       }
//    };

//    const checkSubmit = (object) => {
//       return Object.values(object).every(value => value.trim() !== '');
//    };

//    const handleSubmit = (e) => {
//       e.preventDefault();
//       //send data in server 
//       if (isRegistering) {//registering         
//          checkSubmit(registeringFormData)//check form  to blank text
//             ? (registeringFormData.registerPassword === registeringFormData.confirmPassword)
//                ? socket.emit('registering', {// if register confirm password true send data
//                   firstName: registeringFormData.firstName,
//                   lastName: registeringFormData.lastName,
//                   password: registeringFormData.registerPassword,
//                })
//                : setPasswordMatch(['Password mismatch !', 'Password mismatch !'])
//             : console.log('no text submit');
//       } else {//Login
//          checkSubmit(loginFormData) //check form  to blank text
//             ? socket.emit('login', loginFormData)
//             : console.log('no text submit')
//       }

//       //reset 
//       setLoginFormData({
//          firstName: '',
//          password: '',
//       });

//       setRegisteringFormData({
//          firstName: '',
//          lastName: '',
//          registerPassword: '',
//          confirmPassword: '',
//       });
//    };

//    const handleToggleForm = () => {
//       setIsRegistering((prevValue) => !prevValue);
//    };

//    socket.on('exitLogin', (data) => {
//       setIsRegistering(!isRegistering);

//       //reset 
//       setLoginFormData({
//          firstName: '',
//          password: '',
//       });

//       setRegisteringFormData({
//          firstName: '',
//          lastName: '',
//          registerPassword: '',
//          confirmPassword: '',
//       });
//    });

//    return (
//       <div className={style.Login}>
//          <form className={style.LoginForm} onSubmit={handleSubmit}>
//             {isRegistering ? (
//                <div>
//                   <h1 className={style.h1}>CREATE AN ACCOUNT</h1>
//                   <label>
//                      <input
//                         type="text"
//                         name="firstName"
//                         value={registeringFormData.firstName}
//                         onChange={handleChange}
//                         placeholder="First Name:"
//                         // className={!checkSubmit(registeringFormData) && !registeringFormData.firstName.trim() ? style.error : ''}
//                         maxLength={15}
//                         minLength={3}
//                      />
//                   </label>
//                   <br />
//                   <label>
//                      <input
//                         type="text"
//                         name="lastName"
//                         value={registeringFormData.lastName}
//                         onChange={handleChange}
//                         placeholder="Last Name:"
//                         // className={!checkSubmit(registeringFormData) && !registeringFormData.firstName.trim() ? style.error : ''}
//                         maxLength={15}
//                         minLength={3}
//                      />
//                   </label>
//                   <br />
//                   <label>
//                      <input
//                         type="password"
//                         name="registerPassword"
//                         value={registeringFormData.registerPassword}
//                         onChange={handleChange}
//                         placeholder={passwordMatch[0]}
//                         // className={!checkSubmit(registeringFormData) && !registeringFormData.firstName.trim() ? style.error : ''}
//                         maxLength={15}
//                         minLength={3}
//                      />
//                   </label>
//                   <br />
//                   <label>
//                      <input
//                         type="password"
//                         name="confirmPassword"
//                         value={registeringFormData.confirmPassword}
//                         onChange={handleChange}
//                         placeholder={passwordMatch[1]}
//                         // className={!checkSubmit(registeringFormData) && !registeringFormData.firstName.trim() ? style.error : ''}
//                         maxLength={15}
//                         minLength={3}
//                      />
//                   </label>
//                   <br />
//                   <button type="submit">CREATE ACCOUNT</button>
//                </div>
//             ) : (
//                <div>
//                   <h1 className={style.h1}>ACCOUNT SIGN IN</h1>
//                   <label>
//                      <input
//                         type="text"
//                         name="firstName"
//                         value={loginFormData.firstName}
//                         onChange={handleChange}
//                         placeholder="Your First Name:"
//                         // className={!checkSubmit(loginFormData) && !loginFormData.firstName.trim() ? style.error : ''}
//                         maxLength={15}
//                         minLength={3}
//                      />
//                   </label>
//                   <br />
//                   <label>
//                      <input
//                         type="password"
//                         name="password"
//                         value={loginFormData.password}
//                         onChange={handleChange}
//                         placeholder="Password:"
//                         // className={!checkSubmit(loginFormData) && !loginFormData.firstName.trim() ? style.error : ''}
//                         maxLength={15}
//                         minLength={3}
//                      />
//                   </label>
//                   <br />
//                   <button type="submit">SIGH IN</button>
//                </div>
//             )}

//             <h2 className={style.h2}>
//                {isRegistering
//                   ? "Already have an account? "
//                   : "Don't have an account? "}
//                <a className={style.isRegistering} onClick={handleToggleForm}>
//                   {isRegistering ? 'Sign in' : 'Register'}
//                </a>
//             </h2>
//          </form>
//       </div>
//    );
// };

// export default Login;   