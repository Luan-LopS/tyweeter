import { createApi } from "@reduxjs/toolkit/query/react";
import { Follow, Relations } from "../models/Follow";
import { baseQueryWithReauthWrapper } from "./autHeaders";

export const followService  = createApi({
    reducerPath: 'followService',
    baseQuery: baseQueryWithReauthWrapper,
    tagTypes: ['Follow'],
    endpoints: (build) => ({
        getFollowers: build.query<Follow[], void>({
            query: () => `followers/not_followed/`,
            transformResponse: (response: any)=>{
                return response.results || response
            },
            providesTags: ['Follow'],
        }),
        getRelations: build.query<Relations, void>({
            query:  ()=> 'followers/relations/',
            transformResponse: (response: any) =>{
                return {
                    following:  response.following || [],
                    followers:  response.followers ||  []
                }
            },

            providesTags: ['Follow'],
        }),
        sendFollow: build.mutation<{ followings: boolean}, {user_id: number}>({
            query: ({ user_id }) => ({
            url: `followers/${user_id}/follow/`, 
            method: 'POST',
            }),
            invalidatesTags: ['Follow']

        }),
        unfollow: build.mutation<{ followings: boolean}, {user_id: number}>({
            query: ({ user_id }) => ({
            url: `followers/${user_id}/follow/`, 
            method: 'DELETE', 
            }),
            invalidatesTags: ['Follow']
        })
    }),
})

export const {useGetFollowersQuery, useLazyGetFollowersQuery, useGetRelationsQuery, useSendFollowMutation, useUnfollowMutation } = followService