export interface User{
    name: string
    username: string
    email: string
    bio?: string
    profile_picture?: File
    password: string
}


export interface ResponseCreateUser{
    id: string,
    name: string,
    username: string,
    email: string,
    bio?: string,
    profile_picture?: string,
}


export type Users =  ResponseCreateUser[]