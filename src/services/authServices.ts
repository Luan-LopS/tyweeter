import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest, TokenResponse } from "../models/Auth";
import { ResponseCreateUser } from "../models/User";

export const authService = createApi({
    reducerPath: 'authService',
    baseQuery: fetchBaseQuery({baseUrl: 'https://luanlops.pythonanywhere.com/api/v1/'}),
    endpoints:(builder)=>({
        login: builder.mutation<TokenResponse, LoginRequest>({
            query: (body) => ({
                url: 'token/',
                method: 'POST',
                body,
            })
        }),
        
        refresh: builder.mutation<{access: string},{refresh: string}>({
            query: (body) =>({
                url: 'token/refresh/',
                method: 'POST',
                body
            }),
            onQueryStarted: async ({ refresh }, {  dispatch, queryFulfilled }) =>{
                try{
                    const {data} = await queryFulfilled
                    localStorage.setItem('access', data.access)
                }catch(erro){
                    console.log('Erro',  erro)
                }
            }
        }),
        cadastro: builder.mutation<ResponseCreateUser, FormData>({
            query: (body) => ({
                url: 'users/',
                method: 'POST',
                body
            })
        })
    })
})

export const { useLoginMutation, useRefreshMutation, useCadastroMutation } = authService