import { gitDataActions } from "./index";
import { getAllRepoWithSearch } from "../../services/gitAPI";

const getRepositories = (searchQuery, page) => async dispatch => {
    dispatch(gitDataActions.getRepositoriesRequest());

    try {
        const response = await getAllRepoWithSearch(searchQuery, page);

        dispatch(
            gitDataActions.getRepositoriesSuccess({
                items: response.data.items,
                page,
            }),
        );
    } catch (error) {
        dispatch(gitDataActions.getRepositoriesError());

        console.error(error);
    }
};

// eslint-disable-next-line
export default { getRepositories };
