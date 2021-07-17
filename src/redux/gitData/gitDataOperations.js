import { gitDataActions } from "./index";
import { fetchRepoWithSearchGitApi } from "../../services/gitAPI";

const fetchRepositories = (searchQuery, page) => async dispatch => {
    dispatch(gitDataActions.fetchRepositoriesRequest());

    try {
        const response = await fetchRepoWithSearchGitApi(searchQuery, page);

        dispatch(
            gitDataActions.fetchRepositoriesSuccess({
                items: response.data.items,
                page,
            }),
        );
    } catch (error) {
        dispatch(gitDataActions.fetchRepositoriesError());

        console.error(error);
    }
};

// eslint-disable-next-line
export default { fetchRepositories };
