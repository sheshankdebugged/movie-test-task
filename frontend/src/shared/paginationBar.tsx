import React from 'react';

interface PaginationProps {
  pageNumbers : number[];
  handlePrev : () => void;
  handlePage: (arg : number) => void;
  handleNext: () => void;
  page: number;
}

const PaginationBar: React.FC<PaginationProps> = ({ pageNumbers, handlePrev, handlePage, handleNext, page }) => {
  return (
    <> 
      <div className="mt-24">
        <nav aria-label="Page navigation example">
          <ul className="navigationsec inline-flex text-sm p-5">
            <li>
              <button onClick={handlePrev} className="flex items-center justify-center px-3 h-8 ms-0 text-white text-base font-bold">Pre</button>
            </li>
            {pageNumbers.map((item) => (
              <li key={item}>
                <button onClick={() => handlePage(item)} className={`pagenumber flex items-center justify-center px-3 h-8 leading-tight text-white ${page === item ? 'bg-emerald-400' : ''} rounded`}>{item}</button>
              </li>
            ))}
            <li>
              <button onClick={handleNext} className="flex items-center justify-center px-3 h-8 leading-tight text-white text-base font-bold">Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default PaginationBar;