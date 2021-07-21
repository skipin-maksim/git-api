import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

import { Pagination } from "antd";

import EmptyMsg from "./components/EmptyMsg/EmptyMsg";

import { searchDataSelectors } from "./redux/searchData";
import { gitDataOperations, gitDataSelectors } from "./redux/gitData";

import s from "./App.module.scss";
import RepositoriesList from "./components/RepositoriesList/RepositoriesList";

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const { getSearchValue, getPerPage, getPage } = searchDataSelectors;
    const { getAllRepositoriesList, getTotalCount } = gitDataSelectors;

    const repositoriesList = useSelector(getAllRepositoriesList);
    let totalCount = useSelector(getTotalCount);
    const currentSearchValue = useSelector(getSearchValue);
    const currentSearchPerPage = useSelector(getPerPage);
    const currentSearchPage = useSelector(getPage);

    if (totalCount > 1000) totalCount = 1000;

    const qs = {
        q: currentSearchValue,
        per_page: currentSearchPerPage,
        page: currentSearchPage,
    };

    const fetchSearch = () => {
        const { q, per_page, page } = queryString.parse(location.search);
        dispatch(gitDataOperations.fetchRepositories(q, per_page, page));
    };

    const updatePage = page => {
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

    useEffect(() => {
        if (!location.search) {
            qs.q = "react";
            history.push(`?${queryString.stringify(qs)}`);
            return;
        }

        fetchSearch();
    }, [location.search]);

    return (
        <div className={s.container}>
            <form>Тут будет инпут</form>

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
