import { gitDataActions } from "./index";
import { fetchRepoWithSearchGitApi } from "../../services/gitAPI";
import { searchDataActions } from "../searchData";

const fetchRepositories = (searchQuery, page, perPage) => async dispatch => {
    dispatch(gitDataActions.fetchRepositoriesRequest());
    dispatch(gitDataActions.isLoading(true));

    try {
        const response = await fetchRepoWithSearchGitApi(
            searchQuery,
            page,
            perPage,
        );

        dispatch(gitDataActions.fetchRepositoriesSuccess(response.data));

        dispatch(
            searchDataActions.writeSearchData({
                page: response.page,
                perPage: response.per_page,
                searchValue: response.searchQuery,
            }),
        );
    } catch (error) {
        dispatch(gitDataActions.fetchRepositoriesError());

        console.error(error);
    } finally {
        dispatch(gitDataActions.isLoading(false));
    }
};

// eslint-disable-next-line
export default { fetchRepositories };
