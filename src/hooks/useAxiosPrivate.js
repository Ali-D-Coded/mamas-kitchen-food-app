import { useEffect } from "react";
import { APIClientPrivate } from "../utils/axios";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();

  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = APIClientPrivate.interceptors.request.use(
      (config) => {
        if (config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.access_token}`;
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
  }, [auth, refresh]);

  return APIClientPrivate;
};

export default useAxiosPrivate;
