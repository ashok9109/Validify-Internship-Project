import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({

    name: "auth",
    initialState: {
        user: null,
        isLoggedin : false
    },
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload,
            state.isLoggedin = true
        },
        removeUser: (state) => {
            state.user = null
        }
    }
});

export const {addUser, removeUser, isLoggedin} = authSlice.actions;

export default authSlice.reducer;
