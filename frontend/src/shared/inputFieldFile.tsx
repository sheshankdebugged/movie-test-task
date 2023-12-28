import React from 'react';
import { Field, ErrorMessage } from 'formik'

interface InputFieldFileProps {
    handleUploadFile: (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => Promise<void>;
    type: string;
    name: string;
    classes: string;
    setFieldValue: any
}

const InputFieldFile: React.FC<InputFieldFileProps> = ({ handleUploadFile, type, name, classes, setFieldValue }) => {
    return (
        <>
            <label htmlFor={name}>
                <div>
                    <div className='dragdrop'>
                    </div>
                </div>
                <Field
                    type={type}
                    name={name}
                    id={name}
                    className="imagemovie"
                    accept="image/*"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUploadFile(e, setFieldValue)}
                />
            </label>
            <ErrorMessage
                className='error-message '
                name={name}
                component="div"
            />
        </>
    )
}

export default InputFieldFile;