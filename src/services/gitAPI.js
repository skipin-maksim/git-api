import axios from "axios";

axios.defaults.headers.common["Authorization"] =
    "Bearer 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";

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
        console.log(err);

        if (err.response.status === 403)
            return { status: 403, message: "Request limit reached" };

        return [];
    }
};

export const fetchLanguages = async url => {
    try {
        const { data } = await axios(url);

        return data;
    } catch (err) {
        console.log(err);

        if (err.response.status === 403)
            return { status: 403, message: "Request limit reached" };

        return [];
    }
};
