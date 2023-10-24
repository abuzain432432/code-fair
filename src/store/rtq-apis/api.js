// api.js

import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
export const BASE_URL = 'http://localhost:3000/';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}api/v1/`,
  }),
  tagTypes: ['users', 'projects', 'user-update'],
  endpoints: builder => ({
    projects: builder.query({
      query: (options = {}) => {
        const { category, level, searchTerm } = options;
        let queryParameters = [];

        if (searchTerm) {
          queryParameters.push(`searchTerm=${searchTerm}`);
        }
        if (category) {
          queryParameters.push(`category=${category}`);
        }
        if (level) {
          queryParameters.push(`difficulty=${level}`);
        }

        const queryString = queryParameters.join('&');
        return `/projects${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['projects'],
    }),
    projectDetails: builder.query({
      query: projectId => `/projects/${projectId}`,
    }),
    deleteProject: builder.mutation({
      query: ({ projectId, token }) => ({
        url: `/projects/${projectId}`,
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token },
      }),
      invalidatesTags: ['projects'],
    }),
    login: builder.mutation({
      query: credentials => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => '/logout',
    }),
    signup: builder.mutation({
      query: userData => ({
        url: '/users/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    createProject: builder.mutation({
      query: ({ projectData, token }) => ({
        url: '/projects/',
        method: 'POST',
        body: projectData,
        headers: { Authorization: 'Bearer ' + token },
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ userId, token }) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token },
      }),
      invalidatesTags: ['users'],
    }),
    getAllUsers: builder.query({
      query: token => {
        console.log(token);
        return {
          url: '/users/',
          headers: { Authorization: 'Bearer ' + token },
        };
      },
      providesTags: ['users'],
    }),
    getMe: builder.query({
      query: token => {
        return {
          url: '/users/me',
          headers: { Authorization: 'Bearer ' + token },
        };
      },
      providesTags: ['user-update'],
    }),
    updateMe: builder.mutation({
      query: ({ userData, token }) => ({
        url: '/users/me',
        method: 'PATCH',
        body: userData,
        headers: { Authorization: 'Bearer ' + token },
      }),
      invalidatesTags: ['user-update'],
    }),
    updateUserPassword: builder.mutation({
      query: ({ userData, token }) => {
        console.log(userData);
        return {
          url: '/users/updatepassword',
          method: 'PATCH',
          body: userData,
          headers: { Authorization: 'Bearer ' + token },
        };
      },
      invalidatesTags: ['user-update'],
    }),
  }),
});

export const {
  useProjectsQuery,
  useLoginMutation,
  useSignupMutation,
  useLazyProjectsQuery,
  useLazyProjectDetailsQuery,
  useProjectDetailsQuery,
  useCreateProjectMutation,
  useGetAllUsersQuery,
  useGetMeQuery,
  useLazyGetMeQuery,
  useDeleteUserMutation,
  useDeleteProjectMutation,
  useUpdateMeMutation,
  useUpdateUserPasswordMutation,
} = api;
