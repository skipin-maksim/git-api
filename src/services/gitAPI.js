import axios from "axios";
import { gitDataActions } from "../redux/gitData";

axios.defaults.headers.common["Authorization"] =
    "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";

export const fetchRepoWithSearchGitApi = async (
    searchQuery,
    page,
    per_page,
) => {
    const data = await axios(
        `https://api.github.com/search/repositories?q=${searchQuery}&per_page=${per_page}&page=${page}`,
    );

    return { ...data, page, per_page, searchQuery };
};

export const fetchLanguages = async (url, dispatch) => {
    dispatch(gitDataActions.isLoading(true));

    try {
        const { data } = await axios(url);

        return data;
    } catch (err) {
        console.log(err);
        return [];
    } finally {
        dispatch(gitDataActions.isLoading(false));
    }
};
