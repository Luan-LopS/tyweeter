import { createApi } from '@reduxjs/toolkit/query/react'
import { Users, ResponseCreateUser} from '../models/User'
import { baseQueryWithReauthWrapper } from './autHeaders'


export const Api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauthWrapper,
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