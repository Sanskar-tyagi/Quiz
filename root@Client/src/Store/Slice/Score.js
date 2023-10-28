import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
  name: "score",
  initialState: {
    score: 0,
    total:0, 
  },
  reducers: {
    setredScore:(state,action)=>{
      state.score=action.payload;
    console.log("tunik tunki ",action.payload);
    },
    setTotal:(state,action)=>{
      state.total=action.payload;
      console.log("tunki",action.payload);
    },
    resetScore: (state) => {
      state.score = 0;
      state.total = 0;
    },
    
  },
});

export const { setredScore,setTotal, resetScore } = scoreSlice.actions;
export default scoreSlice.reducer;
