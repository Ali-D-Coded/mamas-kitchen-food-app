import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../slices/auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.18.6:1234",
  credentials: "include",
  headers: {
    "Access-Control-Allow-Origin": "*"
  },
  

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      console.log({token});
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    console.log("hellooo", result?.error?.status);
    if (result?.error?.status === 401) {
      console.log("sending refresh token");
      // send refresh token to get new access token
      const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
      console.log(refreshResult);
      if (refreshResult?.data) {
        const user = api.getState().auth.user;
        //store the new token
        api.dispatch(setCredentials({ ...refreshResult.data, user }));
        //retry the oroginal query with new access token
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
      }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})