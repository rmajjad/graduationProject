import React from 'react'

export default function Input({type='text',id,name,title,value,errors,onChange,onBlur,touched}){
  return (
    
  <>
     <div className=" w-100">
     <label   htmlFor={id} >{title}</label>
    <input type={type}  name={name} value={value}  id={id} onChange={onChange} onBlur={onBlur} />
    {touched[name]&&errors[name]&&<p className='text text-danger'>{errors[name]}</p>}
 
   </div>
   </>
  
  )
}

