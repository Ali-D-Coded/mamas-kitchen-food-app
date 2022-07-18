import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/auth/authSlice";
import APIClient from "../utils/axios";

const useRefreshToken = () => {
  const dispatch = useDispatch()

  const refresh = async () => {
    const response = await APIClient.post("auth/refresh", {
      withCredentials: true,
    });
      
    // setAuth((prev) => {
    //     console.log(JSON.stringify(prev));
    //     console.log(response.data.access_token);
    //     return {
    //       ...prev,
    //       access_token: response.data.access_token,
    //     };
        
    // });
    dispatch(
      setCredentials({
        accessToken: response.data.access_token,
      })
    );
      return response.data.access_token
  };
    
  return refresh;
};

export default useRefreshToken;
