const getAllRepositoriesList = state => state.gitData.repositoriesList;

const getIsLoading = state => state.gitData.isLoading;

const getTotalCount = state => state.gitData.total_count;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllRepositoriesList,
    getIsLoading,
    getTotalCount,
};
