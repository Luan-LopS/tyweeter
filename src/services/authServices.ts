import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginRequest, TokenResponse } from "../models/Auth";
import { ResponseCreateUser } from "../models/User";
import  { baseQueryWithReauthWrapper } from  '../services/autHeaders'
import { refreshToken } from "../store/slice/loginCadastro";

export const authService = createApi({
    reducerPath: 'authService',
    baseQuery: baseQueryWithReauthWrapper,
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
            onQueryStarted: async ({ refresh }, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(refreshToken(data.access)); 
                        localStorage.setItem('access', data.access); 
                    }
                } catch (erro) {
                    console.log('Erro ao renovar o token', erro);
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