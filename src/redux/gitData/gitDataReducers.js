import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import { gitDataActions } from ".";

const repositoriesList = createReducer([], {
    [gitDataActions.fetchRepositoriesSuccess]: (state, { payload }) => payload,
});

export default combineReducers({
    repositoriesList,
});
