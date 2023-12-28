import React from 'react';
import Spinner from './spinner';

interface ButtonProps {
    loading: boolean;
    type: "submit" | "reset" | "button";
    buttonName: string;
    btnclass?: string
    disabled: boolean
}

const ButtonComponent: React.FC<ButtonProps> = ({ loading, type, buttonName, btnclass, disabled }) => {
    return (
        <>
            <button
                type={type}
                className={btnclass}
                disabled={disabled}
            >
                {loading ? <Spinner /> : buttonName}
            </button>
        </>
    )
}

export default ButtonComponent;