import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthHeaders } from "./autHeaders";
import { Like } from "../models/Like";

export const likeService = createApi({
    reducerPath: 'likeService',
    tagTypes: ['Tweets'],
    baseQuery:  fetchBaseQuery({
        baseUrl: 'https://luanlops.pythonanywhere.com/api/v1/',
        prepareHeaders: getAuthHeaders
    }),
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