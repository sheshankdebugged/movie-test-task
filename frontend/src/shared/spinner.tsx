import React from 'react';

const Spinner: React.FC = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </>
  )
}

export default Spinner;