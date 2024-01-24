import React, { useState } from 'react';
import style from './Login.module.scss';
import socket from '../socket';

const Login = () => {
   const [isRegistering, setIsRegistering] = useState(false);

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
         setRegisteringFormData((prevData) => ({
            ...prevData,
            [name]: value,
         }));
      } else {
         setLoginFormData((prevData) => ({
            ...prevData,
            [name]: value,
         }));
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      //send data in server 
      if (isRegistering) {//registering
         socket.emit('registering', registeringFormData);
      } else {//Login
         socket.emit('login', loginFormData);
      }
   };

   const handleToggleForm = () => {
      setIsRegistering((prevValue) => !prevValue);
   };

   return (
      <div className={style.Login}>
         <form className={style.LoginForm} onSubmit={handleSubmit}>
            {isRegistering ? (
               <div>
                  <h1>CREATE AN ACCOUNT</h1>
                  <label>
                     <input
                        type="text"
                        name="firstName"
                        value={registeringFormData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
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
                     />
                  </label>
                  <br />
                  <button type="submit">CREATE ACCOUNT</button>
               </div>
            ) : (
               <div>
                  <h1>ACCOUNT SIGN IN</h1>
                  <label>
                     <input
                        type="text"
                        name="firstName"
                        value={loginFormData.firstName}
                        onChange={handleChange}
                        placeholder="Your First Name"
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
                     />
                  </label>
                  <br />
                  <button type="submit">SIGH IN</button>
               </div>
            )}

            <h2>
               {isRegistering
                  ? "Already have an account? "
                  : "Don't have an account? "}
               <a onClick={handleToggleForm}>
                  {isRegistering ? 'Sign in' : 'Register'}
               </a>
            </h2>
         </form>
      </div>
   );
};

export default Login;
