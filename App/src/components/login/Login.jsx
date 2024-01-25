import React, { useState } from 'react';
import style from './Login.module.scss';
import socket from '../socket';

const Login = () => {
   const [isRegistering, setIsRegistering] = useState(false);
   const [passwordMatch, setPasswordMatch] = useState(['Register Password:', 'Confirm  Password:']);
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

   const handleChange = (e) => {
      const { name, value } = e.target;

      if (isRegistering) {
         setRegisteringFormData((prevData) => ({ ...prevData, [name]: value }));
      } else {
         setLoginFormData((prevData) => ({ ...prevData, [name]: value }));
      }
   };

   const checkSubmit = (object) => {
      return Object.values(object).every(value => value.trim() !== '');
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      //send data in server 
      if (isRegistering) {//registering         
         checkSubmit(registeringFormData)//check form  to blank text
            ? (registeringFormData.registerPassword === registeringFormData.confirmPassword)
               ? socket.emit('registering', {// if register confirm password true send data
                  firstName: registeringFormData.firstName,
                  lastName: registeringFormData.lastName,
                  password: registeringFormData.registerPassword,
               })
               : setPasswordMatch(['Password mismatch !', 'Password mismatch !'])
            : console.log('no text submit');
      } else {//Login
         checkSubmit(loginFormData) //check form  to blank text
            ? socket.emit('login', loginFormData)
            : console.log('no text submit')
      }

      //reset 
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

   const handleToggleForm = () => {
      setIsRegistering((prevValue) => !prevValue);
   };

   socket.on('exitLogin', (data) => {
      setIsRegistering(!isRegistering);

      //reset 
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
   });

   return (
      <div className={style.Login}>
         <form className={style.LoginForm} onSubmit={handleSubmit}>
            {isRegistering ? (
               <div>
                  <h1 className={style.h1}>CREATE AN ACCOUNT</h1>
                  <label>
                     <input
                        type="text"
                        name="firstName"
                        value={registeringFormData.firstName}
                        onChange={handleChange}
                        placeholder="First Name:"
                        // className={!checkSubmit(registeringFormData) && !registeringFormData.firstName.trim() ? style.error : ''}
                        maxLength={15}
                        minLength={3}
                     />
                  </label>
                  <br />
                  <label>
                     <input
                        type="text"
                        name="lastName"
                        value={registeringFormData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name:"
                        // className={!checkSubmit(registeringFormData) && !registeringFormData.firstName.trim() ? style.error : ''}
                        maxLength={15}
                        minLength={3}
                     />
                  </label>
                  <br />
                  <label>
                     <input
                        type="password"
                        name="registerPassword"
                        value={registeringFormData.registerPassword}
                        onChange={handleChange}
                        placeholder={passwordMatch[0]}
                        // className={!checkSubmit(registeringFormData) && !registeringFormData.firstName.trim() ? style.error : ''}
                        maxLength={15}
                        minLength={3}
                     />
                  </label>
                  <br />
                  <label>
                     <input
                        type="password"
                        name="confirmPassword"
                        value={registeringFormData.confirmPassword}
                        onChange={handleChange}
                        placeholder={passwordMatch[1]}
                        // className={!checkSubmit(registeringFormData) && !registeringFormData.firstName.trim() ? style.error : ''}
                        maxLength={15}
                        minLength={3}
                     />
                  </label>
                  <br />
                  <button type="submit">CREATE ACCOUNT</button>
               </div>
            ) : (
               <div>
                  <h1 className={style.h1}>ACCOUNT SIGN IN</h1>
                  <label>
                     <input
                        type="text"
                        name="firstName"
                        value={loginFormData.firstName}
                        onChange={handleChange}
                        placeholder="Your First Name:"
                        // className={!checkSubmit(loginFormData) && !loginFormData.firstName.trim() ? style.error : ''}
                        maxLength={15}
                        minLength={3}
                     />
                  </label>
                  <br />
                  <label>
                     <input
                        type="password"
                        name="password"
                        value={loginFormData.password}
                        onChange={handleChange}
                        placeholder="Password:"
                        // className={!checkSubmit(loginFormData) && !loginFormData.firstName.trim() ? style.error : ''}
                        maxLength={15}
                        minLength={3}
                     />
                  </label>
                  <br />
                  <button type="submit">SIGH IN</button>
               </div>
            )}

            <h2 className={style.h2}>
               {isRegistering
                  ? "Already have an account? "
                  : "Don't have an account? "}
               <a className={style.isRegistering} onClick={handleToggleForm}>
                  {isRegistering ? 'Sign in' : 'Register'}
               </a>
            </h2>
         </form>
      </div>
   );
};

export default Login;   