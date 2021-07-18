export const createQueryString = (query, perPage, page) => {
    return `/?q=${query}&per_page=${perPage}&page=${page}`;
};
