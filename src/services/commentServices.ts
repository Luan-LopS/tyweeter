import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Comment } from "../models/Tweet";
import { getAuthHeaders } from "./autHeaders";

export const commentServices = createApi({
    reducerPath: 'commentServices',
    tagTypes: ['Comments', 'Tweets'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://luanlops.pythonanywhere.com/api/v1/',
        prepareHeaders: getAuthHeaders
    }),
    endpoints: (build) => ({
        getComments: build.query<Comment, void>({
            query: () => 'comments/',
            transformResponse: (response: any) =>  {
                return response.results || response
            }
        }),
        postComments: build.mutation<Comment, {id_tweet: number, content: string}>({
            query: (body) => ({
                url: `comments/`,
                method: 'POST',
                body:{
                    content: body.content,
                    tweet: body.id_tweet
                }
            }),
            invalidatesTags: ['Comments', 'Tweets']
        })
    })
})


export const {useGetCommentsQuery, usePostCommentsMutation} = commentServices