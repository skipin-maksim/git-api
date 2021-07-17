import { configureStore } from "@reduxjs/toolkit";
import gitDataReducers from "./gitData/gitDataReducers";

export const store = configureStore({
    reducer: {
        gitData: gitDataReducers,
    },
});
