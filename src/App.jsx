import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import debounce from "lodash.debounce";
import { Pagination } from "antd";

import { searchDataSelectors } from "./redux/searchData";
import { gitDataOperations, gitDataSelectors } from "./redux/gitData";
import { itemRender } from "./helpers/paginationHelper";

import RepositoriesList from "./components/RepositoriesList/RepositoriesList";
import Form from "./components/Form/Form";
import EmptyMsg from "./components/EmptyMsg/EmptyMsg";

import s from "./App.module.scss";
import ErrorMsg from "./components/ErrorMsg/ErrorMsg";

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { search } = useLocation();

    const [inputSearchValue, setInputSearchValue] = useState("");

    const { getSearchValue, getPerPage, getPage } = searchDataSelectors;
    const {
        getAllRepositoriesList,
        getTotalCount,
        getIsLoading,
        getIsEmpty,
        getError,
    } = gitDataSelectors;

    const repositoriesList = useSelector(getAllRepositoriesList);
    const isLoading = useSelector(getIsLoading);
    const isEmpty = useSelector(getIsEmpty);
    const isError = useSelector(getError);
    let totalCount = useSelector(getTotalCount);
    const currentSearchValue = useSelector(getSearchValue);
    const currentSearchPerPage = useSelector(getPerPage);
    const currentSearchPage = useSelector(getPage);

    if (totalCount > 1000) totalCount = 1000;

    const getQueryString = () => {
        const qs = queryString.parse(search);

        // query string default values
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
        const qs = getQueryString(search);
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
            const qs = getQueryString(search);
            qs.q = value;

            history.push(`?${queryString.stringify(qs)}`);
        }
    };

    const delayedQuery = useCallback(
        debounce(value => handleSubmit(value), 1500),
        [debounce],
    );

    useEffect(() => {
        if (!search) {
            const qs = getQueryString(search);

            history.push(`?${queryString.stringify(qs)}`);
            setInputSearchValue(qs.q);

            return;
        }

        fetchSearch();
    }, [search]);

    return (
        <div className={s.container}>
            <Form
                handleSubmit={handleSubmit}
                inputSearchValue={inputSearchValue}
                handleOnChangeInput={handleOnChangeInput}
                isLoading={isLoading}
            />

            <div className={s.content}>
                {isEmpty && <EmptyMsg value={currentSearchValue} />}

                {isError && <ErrorMsg error={isError} />}

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
                            itemRender={itemRender}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
