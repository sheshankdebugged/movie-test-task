'use client'
import React, { useContext, useEffect, useState } from 'react';
import MovieCard from '@/shared/movieCard';
import { useApp } from '@/hooks/useApp';
import EmptyMovie from './emptyMovie';
import AppContext from '@/contexts/providers';
import PaginationBar from '@/shared/paginationBar';
import MovieSkeleton from '@/shared/movieSkeleton';

const CardWrapper: React.FC = () => {
  const { allMovies, handleGetAllMovies, totalCount, loadingSkeleton } = useApp();
  const { loginState } = useContext(AppContext);
  const [page, setPage] = useState<number>(1);
  const totalPages = Math.ceil(totalCount / 8);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  useEffect(() => {
    handleGetAllMovies(page)
  }, [page, loginState]);

  // Handle Prev
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    } else {
      return
    }
  }

  // Handle Next
  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1)
    } else {
      return
    }
  }

  // Handle Page NUmber
  const handlePage = (pageNum: number) => {
    setPage(pageNum)
  }

  return (
    <>
      {loadingSkeleton ?
        <MovieSkeleton  />
        :
        <div className='h-full'>
          <div className="w-full flex flex-wrap md:justify-between justify-center md:mt-16 mt-10 gap-2">
            <>
              {allMovies === null ?
                <EmptyMovie />
                :
                allMovies?.map((item: any, index: number) => (
                  <div key={index}>
                    <MovieCard
                      id={item.id}
                      title={item.movie_title}
                      year={item.publish_year}
                      image={item.movie_link}
                    />
                  </div>
                ))}
            </>
          </div>
          {allMovies?.length > 0 &&
            <PaginationBar
              pageNumbers={pageNumbers}
              handlePrev={handlePrev}
              handlePage={handlePage}
              handleNext={handleNext}
              page={page}
            />}
        </div>
      }
    </>
  )
}

export default CardWrapper;