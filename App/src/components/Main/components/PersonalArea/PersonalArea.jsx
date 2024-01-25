const PersonalArea = ({ data }) => {
   return (
      <div className="Profile">
         <div>
            <h1>{data.firstName}</h1>
            <h1>{data.lastName}</h1>
         </div>
         <div className="Img">
            <img src="" alt={`Img-${data.firstName}`} />
         </div>
      </div>
   )
}


export default PersonalArea