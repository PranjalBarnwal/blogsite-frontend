import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { 
    username:"",
    token: "",
    id:"",
    profileImg:"",
    bio:"",
    social:"",
    securityQuestion:"",
   },
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
    addIdandName:(state,action)=>{
        state.id=action.payload.id;
        state.username=action.payload.username;
    },
    addCompleteDetails:(state,action)=>{
        state.profileImg=action.payload.profileImg;
        state.bio=action.payload.bio;
        state.social=action.payload.social;
        state.securityQuestion=action.payload.securityQuestion;
    }
  },
});

// this is for dispatch
export const { addToken,addIdandName,addCompleteDetails } = userSlice.actions;

// this is for configureStore
export default userSlice.reducer;
