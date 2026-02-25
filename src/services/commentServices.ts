import { createApi } from "@reduxjs/toolkit/query/react";
import { Comment } from "../models/Tweet";
import { baseQueryWithReauthWrapper } from "./autHeaders";

export const commentServices = createApi({
    reducerPath: 'commentServices',
    tagTypes: ['Comments', 'Tweets'],
    baseQuery: baseQueryWithReauthWrapper,
    endpoints: (build) => ({
        getComments: build.query<Comment, void>({
            query: () => 'comments/',
            transformResponse: (response: any) =>  {
                return response.results || response
            },
            providesTags: ['Comments', 'Tweets']
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