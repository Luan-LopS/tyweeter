import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tweet } from "../models/Tweet";
import { getAuthHeaders } from "./autHeaders";

export  const tweetService = createApi({
    reducerPath: 'tweetService',
    tagTypes: ['Tweets'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://luanlops.pythonanywhere.com/api/v1/',
        prepareHeaders: getAuthHeaders
    }),
    endpoints: (build) =>({
        getTweets: build.query<Tweet[], void>({
            query:()=> 'tweets/',
            transformResponse: (response: any) => {
                return response.results || response
            }
        }),
        getTweetId: build.query<Tweet,  number>({
            query:(id)  => `tweets/${id}/`
        }),
        postTweet: build.mutation<Tweet, any>({
            query: (body) =>({
                url: 'tweets/',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Tweets']
        }),
        deletTweet: build.mutation<void, {id: number}>({
            query: ({ id }) =>({
                url: `tweets/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tweets']
        }),
        editTweet: build.mutation<Tweet, {id: number, content:string}>({
            query:({ id, content })=>({
                url: `tweets/${id}/`,
                method: 'PATCH',
                body:  {content}
            }),
            invalidatesTags: ['Tweets']
        })
        
    })
})

export const { useGetTweetsQuery,  useGetTweetIdQuery, usePostTweetMutation, useDeletTweetMutation, useEditTweetMutation } = tweetService
