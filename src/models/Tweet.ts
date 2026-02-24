export interface UserTweet{
    id: number
    name: string
    username: string
    profile_picture?: string,
}

export interface Tweet {
    id: number
    content: string
    created: string
    user: UserTweet
    liked: boolean
    liked_count: number
    comment: Comment[]
}


export type Tweets = Tweet[]


export interface Comment{
    id: string
    content: string
    created: string
    user: string
    tweet: {
        id: string
        content: string
        created: string
    }
} 