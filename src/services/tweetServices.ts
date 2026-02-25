import { createApi } from "@reduxjs/toolkit/query/react";
import { Tweet } from "../models/Tweet";
import { baseQueryWithReauthWrapper } from "./autHeaders";

export  const tweetService = createApi({
    reducerPath: 'tweetService',
    tagTypes: ['Tweets'],
    baseQuery: baseQueryWithReauthWrapper,
    endpoints: (build) =>({
        getTweets: build.query<Tweet[], void>({
            query:()=> 'tweets/',
            transformResponse: (response: any) => {
                return response.results || response
            },
            providesTags: ['Tweets']

        }),
        getTweetId: build.query<Tweet,  number>({
            query:(id)  => `tweets/${id}/`,
            providesTags: (result, error, id) => [
                { type: 'Tweets', id }
            ]
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

export const { useGetTweetsQuery,  useGetTweetIdQuery, useLazyGetTweetIdQuery, usePostTweetMutation, useDeletTweetMutation, useEditTweetMutation } = tweetService
