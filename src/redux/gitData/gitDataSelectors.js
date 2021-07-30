const getAllRepositoriesList = state => state.gitData.repositoriesList;

const getIsLoading = state => state.gitData.isLoading;

const getIsEmpty = state => state.gitData.isEmpty;

const getError = state => state.gitData.error;

const getTotalCount = state => state.gitData.total_count;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllRepositoriesList,
    getIsLoading,
    getIsEmpty,
    getError,
    getTotalCount,
};
