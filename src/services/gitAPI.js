import { Octokit } from "@octokit/core";
import axios from "axios";

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

export const fetchLanguages = async url => {
    const { data } = await axios(url, {
        headers: {
            Authorization: token,
        },
    });

    return data;
};
