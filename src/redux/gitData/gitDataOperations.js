import { gitDataActions } from "./index";
import { fetchRepoWithSearchGitApi } from "../../services/gitAPI";
import { searchDataActions } from "../searchData";

const fetchRepositories = (searchQuery, perPage, page) => async dispatch => {
    dispatch(gitDataActions.fetchRepositoriesRequest());
    dispatch(gitDataActions.isLoading(true));

    try {
        const response = await fetchRepoWithSearchGitApi(
            searchQuery,
            page,
            perPage,
        );

        if (response.status !== 200) {
            throw response;
        }

        dispatch(gitDataActions.fetchRepositoriesSuccess(response.data));

        dispatch(
            searchDataActions.writeSearchData({
                page: response.page,
                perPage: response.per_page,
                searchValue: response.searchQuery,
            }),
        );
    } catch (error) {
        dispatch(gitDataActions.fetchRepositoriesError(error.message));

        return [];
    } finally {
        //For a longer lasting effect skeleton :)
        setTimeout(() => {
            dispatch(gitDataActions.isLoading(false));
        }, 700);
    }
};

// eslint-disable-next-line
export default { fetchRepositories };
