// import {createApi} from '@reduxjs/toolkit/query/react';
// import {mockEndpoints} from './mockApi';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from '@reduxjs/toolkit/query/react';
import {RootState} from './../store';

const rawBaseQuery = (baseUrl: string) =>
  fetchBaseQuery({
    baseUrl,
    // prepareHeaders: (headers, {getState}) => {
    //   const token = (getState() as RootState).auth..token;
    //   !!token && headers.set('PRIVATE-TOKEN', token);

    //   return headers;
    // },
  });

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
> = async (args, state, extraOptions) => {
  const baseUrl = '';
  return rawBaseQuery(baseUrl)(args, state, extraOptions);
};

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 0});

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRetry,
  // MOCK API
  // baseQuery: args => {
  //   if (args && mockEndpoints[args]) {
  //     return {data: mockEndpoints[args]};
  //   }
  //   return {error: 'Payload not found'};
  // },
  /**
   * Tag types must be defined here for any tags
   * that would be provided by injected endpoints
   */
  tagTypes: [],
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   */
  endpoints: () => ({}),
});
