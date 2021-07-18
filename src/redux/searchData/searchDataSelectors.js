const getPerPage = state => state.searchData.perPage;

const getPage = state => state.searchData.currentPage;

const getSearchValue = state => state.searchData.searchValue;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getSearchValue,
    getPerPage,
    getPage,
};
