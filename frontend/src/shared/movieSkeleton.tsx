import React from 'react';

const MovieSkeleton: React.FC = () => {
  return (
    <div className='flex flex-wrap justify-between gap-4'>
      <div className="cards w-52 shadow-xl mt-10 skeleton-loader">
        <div className="skeleton-image"></div>
      </div>
      <div className="cards w-52 shadow-xl mt-10 skeleton-loader">
        <div className="skeleton-image"></div>
      </div>
      <div className="cards w-52 shadow-xl mt-10 skeleton-loader">
        <div className="skeleton-image"></div>
      </div>
      <div className="cards w-72 shadow-xl mt-10 skeleton-loader">
        <div className="skeleton-image"></div>
      </div>
    </div>
  )
}

export default MovieSkeleton;