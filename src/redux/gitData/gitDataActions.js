import { createAction } from '@reduxjs/toolkit';

const getRepositories = createAction('REPOSITORIES_GET');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getRepositories,
};
