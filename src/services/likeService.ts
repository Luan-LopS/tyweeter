import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauthWrapper } from "./autHeaders";
import { Like } from "../models/Like";

export const likeService = createApi({
    reducerPath: 'likeService',
    tagTypes: ['Tweets'],
    baseQuery:  baseQueryWithReauthWrapper,
    endpoints: (build) =>({
        getLike: build.query<Like[], void>({
            query: ()=>'likes/',
        }),
        PostLike: build.mutation({
            query: ({id, liked}: {id: number, liked: boolean})=>({
                url: `likes/${id}/like/`,
                method: liked ? 'POST' : 'DELETE'
            }),
            invalidatesTags: ['Tweets']
        })
    })
})


export const {useGetLikeQuery, usePostLikeMutation} = likeService