import React from 'react';
import Spinner from './spinner';

interface CancelProps {
    handleCancel: (arg: any) => void;
    buttonText: string;
    type: "submit" | "reset" | "button";
    resetForm?: () => void;
    loading?: boolean;
}

const CancelBtn: React.FC<CancelProps> = ({ handleCancel, buttonText, type, resetForm, loading }) => {
    return (
        <>
            <button
                onClick={() => handleCancel(resetForm)}
                type={type}
                className="text-base text-bold text-white cancelbtn">
                {false ? <Spinner /> : buttonText}
            </button>
        </>
    )
}

export default CancelBtn;