'use client'
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

interface MovieCardProps {
  id: number
  title: string;
  year: string;
  image: string
}

const MovieCard: React.FC<MovieCardProps> = ({ title, year, image, id }) => {
  const router = useRouter()
  return (
    <>
       <div className="cards w-72 shadow-xl" onClick={() => router.push(`/edit-movie/${id}`)}>
          <figure>
            <Image
              src={image}
              alt="image"
              className="rounded-xl cardimg"
              width={266}
              height={400}
            />
          </figure>
          <div className="flex items-center">
            <h2 className="cards-title text-white	leading-10 cardstxt">
              {title}
            </h2>
          </div>
            <p className="text-white text-sm font-normal leading-8"> {year}</p>
        </div>
    </>
  )
}

export default MovieCard;