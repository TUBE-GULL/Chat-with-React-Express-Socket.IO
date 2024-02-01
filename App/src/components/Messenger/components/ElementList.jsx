import React from 'react';
import Style from './ElementList.module.scss'
import iconsImage from '../../../img/icons.png';


const PersonalArea = ({ data }) => {
   return (
      <div className={Style.User} >
         <div>
            <h1>{data.firstName}</h1>
            <h2>{data.lastName}</h2>
         </div>
         <div className={Style.Img}>
            <img src={iconsImage} alt={`Img-${data.firstName}`} />
         </div>
      </div >
   );
}

export default PersonalArea;
