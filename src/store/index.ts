import { configureStore } from "@reduxjs/toolkit";
import loginCadastroReducer from "./slice/loginCadastro";
import { authService } from "../services/authServices";
import { tweetService } from "../services/tweetServices";
import { Api } from "../services/api";
import { followService } from "../services/followServices";
import { likeService } from "../services/likeService";

export const store = configureStore({
    reducer:{
        auth: loginCadastroReducer,
        [authService.reducerPath]: authService.reducer,
        [tweetService.reducerPath]: tweetService.reducer,
        [Api.reducerPath]: Api.reducer,
        [followService.reducerPath]: followService.reducer,
        [likeService.reducerPath]:  likeService.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authService.middleware)
            .concat(tweetService.middleware)
            .concat(Api.middleware)
            .concat(followService.middleware)
            .concat(likeService.middleware)

})

export type RootReducer = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch