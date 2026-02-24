import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Users, ResponseCreateUser} from '../models/User'
import { getAuthHeaders } from './autHeaders'


export const Api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/api/v1/',
        prepareHeaders: getAuthHeaders
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUser: builder.query<ResponseCreateUser,  void>({
            query: () => 'users/me/',
            providesTags:['User']
        }),
        updateUser: builder.mutation<ResponseCreateUser,Partial<ResponseCreateUser>| FormData>({
            query: (body) =>({
                url: 'users/me/',
                method: 'PATCH',
                body: body,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            }),
            invalidatesTags: ['User'],
        }),
        getUsers: builder.query<Users, void>({
            query: () => 'users',
            transformResponse: (response: any) => {
                return Array.isArray(response.results) ? response.results:[]
            }
        })
    })
})

export const { useGetUserQuery, useLazyGetUserQuery, useUpdateUserMutation, useLazyGetUsersQuery, useGetUsersQuery } = Api