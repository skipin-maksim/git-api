import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import { gitDataActions } from ".";

const repositoriesList = createReducer(false, {
    [gitDataActions.getRepositories]: (state, { payload }) => state,
});
const currentPage = createReducer(1, {
    [gitDataActions.getRepositories]: (state, { payload }) => state,
});

export default combineReducers({
    repositoriesList,
    currentPage,
});
