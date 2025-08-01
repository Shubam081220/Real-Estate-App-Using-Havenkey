import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState={
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
            state.currentUser=null;
        },
        clearError: (state) => {
            state.error = null;
        },
        
    },
}); 


export const {signInStart,signInFailure,signInSuccess,clearError}=userSlice.actions;

export default userSlice.reducer;
