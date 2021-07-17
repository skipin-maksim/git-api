import { Octokit } from "@octokit/core";

const octokit = new Octokit({
    auth: process.env.REACT_APP_AUTH_TOKEN,
});

export const fetchRepoWithSearchGitApi = async (searchQuery, page) => {
    return await octokit.request(`GET /search/repositories`, {
        q: searchQuery,
        per_page: 10,
        page: page,
    });
};
