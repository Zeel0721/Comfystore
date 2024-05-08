import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface user{
    username?: string;
}

const initialState: user | null = {

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string>) =>{
            state.username = action.payload
        },
        clearUser: (state) => {
            state = {}
        }
    }
})
export const {setUser,clearUser} = userSlice.actions
export default userSlice.reducer