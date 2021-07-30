import axios from "axios";

axios.defaults.headers.common[
    "Authorization"
] = `Bearer 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`;

export const fetchRepoWithSearchGitApi = async (
    searchQuery,
    page,
    per_page,
) => {
    try {
        const data = await axios(
            `https://api.github.com/search/repositories?q=${searchQuery}&per_page=${per_page}&page=${page}`,
        );

        return { ...data, page, per_page, searchQuery };
    } catch (err) {
        const { response } = err;

        if (response.status === 401)
            return { status: 401, message: response.data.message };

        if (response.status === 403)
            return { status: 403, message: response.data.message };

        return [];
    }
};

export const fetchLanguages = async url => {
    try {
        const { data } = await axios(url);

        return data;
    } catch (err) {
        if (err.response.status === 403)
            return { status: 403, message: "Request limit reached" };

        return [];
    }
};
