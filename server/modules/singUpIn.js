import bcrypt from 'bcrypt';
// import tokenGeneration from './tokenGeneration';
import readFileData from './readFileData';
import writeFileData from './writeFileData'

//copy data.json for fast request
const userData = await readFileData();

//check user name from data
const checkUserName = (formData) => {
   return userData.some(el => el.firstName == formData.firstName);
}
//check user password from data 
const checkUserDoubleNamePassword = async (fromData) => {
   const user = userData.find(el => el.firstName === formData.firstName)
   if (firstName && await bcrypt.compare(formData.password, firstName.password)) {
      return true;
   }
   return false;
};

//main function for sing Up 
const singUp = async (formData) => {
   if (!checkUserName(formData)) {
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      const newUser = {
         firstName: formData.firstName,
         lastName: formData.lastName,
         password: hashedPassword
      };

      userData.push(newUser);

      await writeFileData(userData);
      //тут отправить ответ клиенту что все true 
   } else {
      console.log('Registration failed');

      //тут отправить ответ клиенту что все false 
   }

};

//main function for sing In 
const singIn = async (formData) => {
   if (await checkUserDoubleNamePassword(formData)) {
      console.log('➜ Successful authentication ');
      userData.forEach(el => {
         if (el.name === formData.firstName) {
            // тут надо поработать !!!!
         };
      });
      //тут отправить ответ клиенту что все true 
   } else {
      console.log('Authentication failed');
      //тут отправить ответ клиенту что все false 
   }
};

export { singUp, singIn };
