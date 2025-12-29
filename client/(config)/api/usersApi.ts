import { api } from './api';

const productApi = api.injectEndpoints({
  endpoints: builder => ({
    allUsersCount: builder.query({
      query: () => 'api/user/totalUsers',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: data => ({
        url: 'api/user/update',
        body: data,
        method: 'PATCH',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAllUsersCountQuery, useUpdateProfileMutation } = productApi;
