import React from 'react';

const SkeletonLoadingView: React.FC = () => {
    return (
        <>
            <div className="fieldinput w-full">
                <label className="label-container">
                    <span className="skeletonloader"></span>
                </label>
            </div>
        </>
    )
}

export default SkeletonLoadingView;