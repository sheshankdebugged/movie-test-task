// Api Contoller
import { instance } from './interceptors';

 // GET request
 export const getData = async (endpoint: string) => {
    try {
      const response = await instance.get(`${endpoint}`);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

// POST Request
export const postData = async (endpoint: string, data: any) => {
    try {
      const response = await instance.post(`${endpoint}`, data);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // PUT Request
  export const putData = async (endpoint:string, data: any) => {
    try {
      const response = await instance.put(`${endpoint}`, data);
      return response;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
