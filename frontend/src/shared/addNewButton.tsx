import React from 'react';

interface ButtonProps {
    buttonName: string;
    btnclass?: string;
    handleClick: () => void;
}

const AddNewBtn: React.FC<ButtonProps> = ({ buttonName, btnclass, handleClick }) => {
    return (
        <>
            <button
                type='button'
                className={btnclass}
                onClick={handleClick}
            >
                 {buttonName}
            </button>
        </>
    )
}

export default AddNewBtn;