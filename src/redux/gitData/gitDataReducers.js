import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import { gitDataActions } from ".";

const repositoriesList = createReducer([], {
    [gitDataActions.fetchRepositoriesSuccess]: (state, { payload }) =>
        payload.items,
});
const currentPage = createReducer(null, {
    [gitDataActions.fetchRepositoriesSuccess]: (state, { payload }) =>
        payload.page,
});

export default combineReducers({
    repositoriesList,
    currentPage,
});
