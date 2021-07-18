import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import { gitDataActions } from ".";

const repositoriesList = createReducer([], {
    [gitDataActions.fetchRepositoriesSuccess]: (state, { payload }) =>
        payload.items,
});

const total_count = createReducer(0, {
    [gitDataActions.fetchRepositoriesSuccess]: (state, { payload }) =>
        payload.total_count,
});

const isLoading = createReducer(false, {
    [gitDataActions.isLoading]: (state, { payload }) => payload,
});

export default combineReducers({
    repositoriesList,
    total_count,
    isLoading,
});
