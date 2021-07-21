import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import { searchDataActions } from "./index";

const currentPage = createReducer(1, {
    [searchDataActions.writeSearchData]: (state, { payload }) =>
        Number(payload.page),
});

const perPage = createReducer(4, {
    [searchDataActions.writeSearchData]: (state, { payload }) =>
        payload.perPage,
});

const searchValue = createReducer("", {
    [searchDataActions.writeSearchData]: (state, { payload }) =>
        payload.searchValue,
});

export default combineReducers({
    searchValue,
    currentPage,
    perPage,
});
