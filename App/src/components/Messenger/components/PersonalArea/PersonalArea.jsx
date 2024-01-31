import React from 'react';

const PersonalArea = ({ data }) => {
   return (
      <div className="Profile">
         <div>
            <h1>{data.firstName}</h1>
            <h2>{data.lastName}</h2>
         </div>
         <div className="Img">
            <img src="" alt={`Img-${data.firstName}`} />
         </div>
      </div>
   );
}

export default PersonalArea;
