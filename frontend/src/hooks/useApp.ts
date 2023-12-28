import { getData, postData } from '@/services/apiServices';
import { AddMovieTypeSubmit, LoginValuesTypes } from '../types/common'
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import AppContext from '@/contexts/providers';
import { toast } from 'react-toastify';

export interface UseAuthOutput {
  handleLogin: (arg: LoginValuesTypes) => Promise<boolean>;
  handleAddMovie: (arg: AddMovieTypeSubmit) => Promise<boolean>;
  handleGetAllMovies: (arg: number) => void;
  loading: boolean;
  allMovies: any;
  totalCount: number;
  loadingSkeleton: boolean;
  setAllMovies: Dispatch<SetStateAction<any>>;
  // Some of the types may be taken from types (Common types)
}


export const useApp = (): UseAuthOutput => {
  const [allMovies, setAllMovies] = useState<any>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loadingSkeleton, setLoadingSkeleton] = useState<boolean>(true)

  const { setLoginState } = useContext(AppContext)

  const [loading, setLoading] = useState<boolean>(false)
  // Login Function
  const handleLogin = async (values: LoginValuesTypes): Promise<boolean> => {
    setLoading(true)
    try {
      const result = await postData('/api/signin', values);
      if (result.data.success === true) {
        toast.success(result.data.message);
        Cookies.set('user', JSON.stringify(result.data.data.userCheck))
        Cookies.set('token', result.data.data.token)
        setLoginState(true)
        setLoading(false)
        return true;
      } else {
        toast.error(result.data.message);
        setLoading(false)
        return false;
      }
    } catch (error) {
      toast.error("Please login with admin credentials");
      setLoading(false)
      console.log('error', error);
      return false;
    }
  }

  // Get All Movies 
  const handleGetAllMovies = async (page: number) => {
    setLoadingSkeleton(true)
    try {
      const result = await getData(`/api/getallmovies?limit=8&page=${page}`);
      if (result.data.success === true) {
        if(result.data.data.movies.length === 0){
          setAllMovies(null)
        } else {
          setAllMovies(result.data.data.movies)
        }
        setTotalCount(result.data.data.movieCount)
        setLoadingSkeleton(false)
      } else {
        setAllMovies([])
        setLoadingSkeleton(false)
      }
    } catch (error) {
      setAllMovies([])
      setLoadingSkeleton(false)
      console.log('errorerror', error)

    }
  }

  // Add Movie 
  const handleAddMovie = async (values: AddMovieTypeSubmit): Promise<boolean> => {
    setLoading(true)
    try {
      const result = await postData('/api/addmovie', values);
      if (result.data.success === true) {
        setLoading(false)
        return true;
      } else {
        toast.error(result.data.message);
        setLoading(false)
        return false;
      }
    } catch (error) {
      toast.error('Somethimg Went Wrong!')
      setLoading(false)
      console.log('error', error);
      return false;
    }
  }

  return {
    handleLogin, loading, handleAddMovie, handleGetAllMovies, allMovies, setAllMovies, totalCount, loadingSkeleton
  }
}