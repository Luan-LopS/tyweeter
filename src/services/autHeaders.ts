import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Mutex } from "async-mutex"
import { refreshToken, logout } from "../store/slice/loginCadastro"
import type { RootReducer } from "../store/index"

const mutex = new Mutex()

type RefreshTokenResponse = {
    access: string;
};

export const baseQueryWithReauth = fetchBaseQuery({
    baseUrl: "https://luanlops.pythonanywhere.com/api/v1/",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootReducer).auth.access || localStorage.getItem("access")
        if (token) headers.set("Authorization", `Bearer ${token}`)
        return headers
    },
})

export const baseQueryWithReauthWrapper = async (args: any, api: any, extraOptions: any) => {
    await mutex.waitForUnlock()
    let result = await baseQueryWithReauth(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshTokenStored = (api.getState() as RootReducer).auth.refresh || localStorage.getItem("refresh")
                if (refreshTokenStored) {
                    const refreshResult = await baseQueryWithReauth(
                        { url: "token/refresh/", method: "POST", body: { refresh: refreshTokenStored } },
                        api,
                        extraOptions
                    )
                    if (refreshResult.data &&  (refreshResult.data as  RefreshTokenResponse).access) {
                      const accessToken = (refreshResult.data as RefreshTokenResponse).access;
                      api.dispatch(refreshToken(accessToken));  
                      localStorage.setItem("access", accessToken);  

                      result = await baseQueryWithReauth(args, api, extraOptions);
                    } else {
                        api.dispatch(logout())
                    }
                } else {
                    api.dispatch(logout())
                }
            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock()
            result = await baseQueryWithReauth(args, api, extraOptions)
        }
    }

    return result
}