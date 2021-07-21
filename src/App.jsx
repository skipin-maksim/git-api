import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import debounce from "lodash.debounce";

import { Pagination } from "antd";

import EmptyMsg from "./components/EmptyMsg/EmptyMsg";

import { searchDataSelectors } from "./redux/searchData";
import { gitDataOperations, gitDataSelectors } from "./redux/gitData";

import s from "./App.module.scss";
import RepositoriesList from "./components/RepositoriesList/RepositoriesList";

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { search } = useLocation();

    const [inputSearchValue, setInputSearchValue] = useState("");

    const { getSearchValue, getPerPage, getPage } = searchDataSelectors;
    const { getAllRepositoriesList, getTotalCount } = gitDataSelectors;

    const repositoriesList = useSelector(getAllRepositoriesList);
    let totalCount = useSelector(getTotalCount);
    const currentSearchValue = useSelector(getSearchValue);
    const currentSearchPerPage = useSelector(getPerPage);
    const currentSearchPage = useSelector(getPage);

    if (totalCount > 1000) totalCount = 1000;

    const getQueryString = () => {
        const qs = queryString.parse(search);

        qs.q = currentSearchValue;
        qs.per_page = currentSearchPerPage;
        qs.page = currentSearchPage;

        return qs;
    };

    const fetchSearch = () => {
        const { q, per_page, page } = queryString.parse(search);

        if (q) {
            dispatch(gitDataOperations.fetchRepositories(q, per_page, page));
            setInputSearchValue(q);
        }
    };

    const updatePage = page => {
        const qs = getQueryString();
        qs.page = page;
        history.push(`?${queryString.stringify(qs)}`);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleOnChangePagination = e => {
        scrollToTop();
        updatePage(e);
    };

    const handleOnChangeInput = e => {
        setInputSearchValue(e.target.value);
        delayedQuery(e.target.value);
    };

    const handleSubmit = (value, e) => {
        if (e) e.preventDefault();

        if (value) {
            const qs = getQueryString();
            qs.q = value;

            history.push(`?${queryString.stringify(qs)}`);
        }
    };

    const delayedQuery = useCallback(
        debounce(value => handleSubmit(value), 1500),
        [debounce],
    );

    useEffect(() => {
        const qs = getQueryString();

        if (!search) {
            qs.q = "react";
            history.push(`?${queryString.stringify(qs)}`);
            setInputSearchValue(qs.q);

            return;
        }

        fetchSearch();
    }, [search]);

    return (
        <div className={s.container}>
            <form onSubmit={e => handleSubmit(inputSearchValue, e)}>
                <input
                    type="text"
                    value={inputSearchValue}
                    onChange={handleOnChangeInput}
                />
            </form>

            <div className={s.content}>
                {!repositoriesList.length && (
                    <EmptyMsg value={currentSearchValue} />
                )}

                {repositoriesList.length > 0 && (
                    <>
                        <RepositoriesList />

                        <Pagination
                            total={totalCount}
                            current={currentSearchPage}
                            defaultPageSize={currentSearchPerPage}
                            showSizeChanger={false}
                            onChange={handleOnChangePagination}
                            size={"small"}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
