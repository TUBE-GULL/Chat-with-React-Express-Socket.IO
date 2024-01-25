import React, { useState } from 'react';
import style from './Login.module.scss';
import socket from '../socket';

const Login = () => {
   const [isRegistering, setIsRegistering] = useState(false);
   // const [passwordMatch, setPasswordMatch] = useState(true);
   // const [loginMatch, setLoginMatch] = useState(true);

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

   const handleSubmit = (e) => {
      e.preventDefault();
      //send data in server 
      if (isRegistering) {//registering
         if (registeringFormData.registerPassword === registeringFormData.confirmPassword) {
            socket.emit('registering', {// if register confirm password true send data
               firstName: registeringFormData.firstName,
               lastName: registeringFormData.lastName,
               password: registeringFormData.registerPassword,
            })
         } else {
            setPasswordMatch(false);
         }
      } else {//Login
         socket.emit('login', loginFormData);
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

   socket.on('returnRegistering', (data) => {
      console.log(data.message); // return registering

   });

   // socket.on('returnLogin', (data) => {

   //    data.login
   //       ? setIsRegistering(true)
   //       : setIsRegistering(false);

   //    // Clear the data form after receiving income.
   //    setLoginFormData({
   //       firstName: '',
   //       password: '',
   //    });

   //    setRegisteringFormData({
   //       firstName: '',
   //       lastName: '',
   //       registerPassword: '',
   //       confirmPassword: '',
   //    });
   // });

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
                        placeholder="First Name"
                     // className={!passwordMatch ? style.passwordMismatch : ''}
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
                     // className={!passwordMatch ? style.passwordMismatch : ''}
                     />
                  </label>
                  <br />
                  <label>
                     <input
                        type="password"
                        name="registerPassword"
                        value={registeringFormData.registerPassword}
                        onChange={handleChange}
                        placeholder="Register Password"
                     // className={!passwordMatch ? style.passwordMismatch : ''}
                     />
                  </label>
                  <br />
                  <label>
                     <input
                        type="password"
                        name="confirmPassword"
                        value={registeringFormData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                     // className={!passwordMatch ? style.passwordMismatch : ''}
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
                        placeholder="Your First Name"
                     // className={!passwordMatch ? style.passwordMismatch : ''}
                     />
                  </label>
                  <br />
                  <label>
                     <input
                        type="password"
                        name="password"
                        value={loginFormData.password}
                        onChange={handleChange}
                        placeholder=" Password"
                     // className={!passwordMatch ? style.passwordMismatch : ''}
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