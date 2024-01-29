function InputModule(props) {
   return (<>
      <input
         type={props.type}
         name={props.name}
         value={props.value}
         onChange={props.onChange}
         placeholder={props.placeholder}
         // className={!checkSubmit(loginFormData) && !loginFormData.firstName.trim() ? style.error : ''}
         maxLength='15'
         minLength='3'
      />
   </>
   )
};

export default InputModule;