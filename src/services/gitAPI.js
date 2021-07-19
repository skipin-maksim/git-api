import { Octokit } from "@octokit/core";
import axios from "axios";
import { gitDataActions } from "../redux/gitData";

const token = "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";

const octokit = new Octokit({
    auth: token,
});

export const fetchRepoWithSearchGitApi = async (
    searchQuery,
    page,
    per_page,
) => {
    const data = await octokit.request(`GET /search/repositories`, {
        q: searchQuery,
        per_page,
        page: page,
    });

    return { ...data, page, per_page, searchQuery };
};

export const fetchLanguages = async (url, dispatch) => {
    dispatch(gitDataActions.isLoading(true));

    try {
        const { data } = await axios(url, {
            headers: {
                Authorization: `Bearer  ${token}`,
            },
        });

        return data;
    } catch (err) {
        console.log(err);
        return {};
    } finally {
        dispatch(gitDataActions.isLoading(false));
    }
};
