// в этом проэкте я не использовал слайсы, так как он не большой, но умею ими пользоваться, если что
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LS_TH_KEY = "pk";

interface PaintingsState {
  theme: boolean;
}

const initialState: PaintingsState = {
  theme: JSON.parse(localStorage.getItem(LS_TH_KEY) || "false"),
};

export const paintingsSlice = createSlice({
  name: "paintings",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.theme = action.payload;
      localStorage.setItem(LS_TH_KEY, JSON.stringify(state.theme));
    },
  },
});
