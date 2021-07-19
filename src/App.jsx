import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Pagination } from "antd";

import EmptyMsg from "./components/EmptyMsg/EmptyMsg";

import { searchDataSelectors } from "./redux/searchData";
import { gitDataOperations, gitDataSelectors } from "./redux/gitData";

import { useQuery } from "./helpers/useQuery";
import { createQueryString } from "./helpers/createQueryString";

import s from "./App.module.scss";
import RepositoriesList from "./components/RepositoriesList/RepositoriesList";

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();
    const location = useLocation();

    const { getSearchValue, getPerPage, getPage } = searchDataSelectors;
    const { getAllRepositoriesList, getTotalCount } = gitDataSelectors;

    const repositoriesList = useSelector(getAllRepositoriesList);
    let totalCount = useSelector(getTotalCount);
    const currentSearchValue = useSelector(getSearchValue);
    const currentSearchPerPage = useSelector(getPerPage);
    const currentSearchPage = useSelector(getPage);

    if (totalCount > 1000) totalCount = 1000;

    const fetchSearch = () => {
        const page = query.get("page");
        const searchQuery = query.get("q");
        const perPage = query.get("per_page");

        dispatch(
            gitDataOperations.fetchRepositories(searchQuery, page, perPage),
        );
    };

    const updatePage = page => {
        history.push(
            createQueryString(currentSearchValue, currentSearchPerPage, page),
        );
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
        if (!location.search)
            history.push(
                createQueryString(
                    currentSearchValue,
                    currentSearchPerPage,
                    currentSearchPage,
                ),
            );

        if (location.search) fetchSearch();
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
