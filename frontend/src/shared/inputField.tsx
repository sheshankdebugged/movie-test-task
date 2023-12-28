import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik'

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  classes: string;
  required?: boolean;
  errorMessage?: string;
  value?: any
}

const InputField: React.FC<InputProps> = ({ name, type, placeholder, classes,value }) => {

  return (
    <>
      <Field
        type={type}
        name={name}
        className={`input input-bordered w-full max-w-xs inputfields ${classes} `}
        placeholder={placeholder}
        defaultValue={value}

      />
      <ErrorMessage
        name={name}
        component="div"
        className='error-message '
      />

    </>
  )
}

export default InputField;