import { createAction } from "@reduxjs/toolkit";

const fetchRepositoriesRequest = createAction(
    "GIT_DATA_fetchRepositoriesRequest",
);
const fetchRepositoriesSuccess = createAction(
    "GIT_DATA_fetchRepositoriesSuccess",
);
const fetchRepositoriesError = createAction("GIT_DATA_fetchRepositoriesError");

const isLoading = createAction("GIT_DATA_isLoading");

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    fetchRepositoriesRequest,
    fetchRepositoriesSuccess,
    fetchRepositoriesError,

    isLoading,
};
