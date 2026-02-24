import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LoginState = {
    IsLogged: boolean
    currentUserId: number
    access: string |  null
    refresh: string |  null
}

type LoginPayload = {
    isLogged: boolean
    userId: number
    access: string
    refresh: string
}

const initialState: LoginState = {
    IsLogged: !!localStorage.getItem("access"),
    currentUserId: 0,
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh')
}

const SliceLoginCadastro = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<LoginPayload>) => {
            state.IsLogged = action.payload.isLogged
            state.currentUserId = action.payload.userId
            state.access = action.payload.access
            state.refresh = action.payload.refresh

            localStorage.setItem('access', action.payload.access)
            localStorage.setItem('refresh', action.payload.refresh)
        },
        refreshToken: (state, action:PayloadAction<string>) => {
            state.access  =  action.payload
            localStorage.setItem('access',  action.payload)
        },
        logout: (state) => {
            state.IsLogged = false;
            state.currentUserId = 0;
            state.access = null
            state.refresh = null

            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
        }
    }
});

export const { setLogin, refreshToken, logout } = SliceLoginCadastro.actions;
export default SliceLoginCadastro.reducer;
