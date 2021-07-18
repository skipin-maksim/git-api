import { configureStore } from "@reduxjs/toolkit";
import gitDataReducers from "./gitData/gitDataReducers";
import searchDataReducers from "./searchData/searchDataReducers";

export const store = configureStore({
    reducer: {
        gitData: gitDataReducers,
        searchData: searchDataReducers,
    },
});
