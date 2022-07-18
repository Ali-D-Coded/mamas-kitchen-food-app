import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/slices/auth/authSlice";
import { APIClientPrivate } from "../utils/axios";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const token = useSelector(selectCurrentToken)


  useEffect(() => {
    const requestIntercept = APIClientPrivate.interceptors.request.use(
      (config) => {
        if (config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = APIClientPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return APIClientPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      APIClientPrivate.interceptors.request.eject(requestIntercept);
      APIClientPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [token, refresh]);

  return APIClientPrivate;
};

export default useAxiosPrivate;
