import { gitDataActions } from "./index";
import { fetchRepoWithSearchGitApi } from "../../services/gitAPI";
import { searchDataActions } from "../searchData";

const fetchRepositories = (searchQuery, page, per_page) => async dispatch => {
    dispatch(gitDataActions.fetchRepositoriesRequest());

    try {
        const response = await fetchRepoWithSearchGitApi(
            searchQuery,
            page,
            per_page,
        );
        console.log(response);

        dispatch(
            gitDataActions.fetchRepositoriesSuccess(response.data.data.items),
        );
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
    }
};

// eslint-disable-next-line
export default { fetchRepositories };
