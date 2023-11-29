import { createSlice } from "@reduxjs/toolkit";

interface SpinnerState {
    showSpinner: boolean;
}

const initialState: SpinnerState = {
    showSpinner: false,
};

const spinnerSlice = createSlice({
    name: "spinner",
    initialState,
    reducers: {
        showSpinner: (state) => {
            state.showSpinner = true;
        },
        hideSpinner: (state) => {
            state.showSpinner = false;
        },
    },
});

export const { showSpinner, hideSpinner } = spinnerSlice.actions;
export default spinnerSlice.reducer;
