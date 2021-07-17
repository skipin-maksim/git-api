import { createAction } from "@reduxjs/toolkit";

const getRepositoriesRequest = createAction("GIT_DATA_getRepositoriesRequest");
const getRepositoriesSuccess = createAction("GIT_DATA_getRepositoriesSuccess");
const getRepositoriesError = createAction("GIT_DATA_getRepositoriesError");

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getRepositoriesRequest,
    getRepositoriesSuccess,
    getRepositoriesError,
};
