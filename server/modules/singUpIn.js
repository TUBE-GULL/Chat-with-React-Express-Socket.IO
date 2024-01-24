import bcrypt from 'bcrypt';

// import tokenGeneration from './tokenGeneration';
import readFileData from './readFileData.js';
import writeFileData from './writeFileData.js ';
import tokenGeneration from './tokenGeneration.js';

//copy data.json for fast request
const userData = await readFileData();

//check FirstsName name from data
const checkUserFirstsName = (formData) => {
   return userData.some(el => el.firstName == formData.firstName);
};

//check LastName name from data
const checkUserLastName = (formData) => {
   return userData.some(el => el.lastName == formData.lastName);
};

//check user password from data 
const checkUserDoubleNamePassword = async (formData) => {
   const user = userData.find(el => el.firstName === formData.firstName);
   if (user && await bcrypt.compare(formData.password, user.password)) {
      return true;
   }
   return false;
};

//main function for sing Up 
const singUp = async (formData) => {
   if (!checkUserFirstsName(formData) && !checkUserLastName(formData)) {
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      const newUser = {
         id: await tokenGeneration(10),
         firstName: formData.firstName,
         lastName: formData.lastName,
         password: hashedPassword
      };
      userData.push(newUser);
      await writeFileData(userData);

      console.log('➜ Successful Registration');
      return true;
   } else {
      console.log('➜ Registration failed');
      return false;
   }
};

//main function for sing In 
const singIn = async (formData) => {
   if (await checkUserDoubleNamePassword(formData)) {
      // userData.forEach(el => {
      //    if (el.firstName === formData.firstName) {
      //       // тут надо поработать !!!!
      //       // что то передавть в сессию
      //    };
      // });

      console.log('➜ Successful authentication');
      return false;
   } else {
      console.log('➜ Authentication failed');
      return true;
   }
};

export { singUp, singIn };
