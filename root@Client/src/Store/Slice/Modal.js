import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: {
    login: false,
    signup: false,
  },
};

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      const modalName = action.payload;
      state.modals[modalName] = !state.modals[modalName];
    },
  },
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
