import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const api = fetchBaseQuery({
  baseUrl: '/api',
  credentials: 'include',
  mode: 'cors',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json')
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Headers', '*');
    headers.set('Access-Control-Allow-Methods', '*');

    return headers;
  }
})

export const baseApi = createApi({
  baseQuery: api,
  reducerPath: 'baseApi',
  endpoints: () => ({}),
});
