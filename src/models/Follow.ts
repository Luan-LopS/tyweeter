export interface Follow {
    id: number
    name: string
    username: string
    following: string
    bio: string
    profile_picture:  string
    following_username: string
    follower: string
    follower_username: string
    created: string
}


export interface Relations {
    following: Follow[]
    followers: Follow[]
}

