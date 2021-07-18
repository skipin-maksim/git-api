import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Pagination } from "antd";
import { Layout } from "antd";
import Loader from "react-loader-spinner";

import { searchDataSelectors } from "./redux/searchData";
import { gitDataOperations, gitDataSelectors } from "./redux/gitData";

import { useQuery } from "./helpers/useQuery";
import { createQueryString } from "./helpers/createQueryString";

import "./App.module.scss";

function App() {
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();
    const location = useLocation();

    const { Header, Footer, Sider, Content } = Layout;
    const { getSearchValue, getPerPage, getPage } = searchDataSelectors;
    const { getAllRepositoriesList, getIsLoading, getTotalCount } =
        gitDataSelectors;

    const repositoriesList = useSelector(getAllRepositoriesList);
    const isLoading = useSelector(getIsLoading);
    let totalCount = useSelector(getTotalCount);
    const currentSearchValue = useSelector(getSearchValue);
    const currentSearchPerPage = useSelector(getPerPage);
    const currentSearchPage = useSelector(getPage);

    if (totalCount > 1000) totalCount = 1000;

    const fetchSearch = () => {
        const page = query.get("page");
        const searchQuery = query.get("q");

        dispatch(gitDataOperations.fetchRepositories(searchQuery, page));
    };

    const updatePage = page => {
        history.push(
            createQueryString(currentSearchValue, currentSearchPerPage, page),
        );
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
        <Layout>
            {!repositoriesList.length && !isLoading && (
                <p>По вашему запросу ничего не найдено</p>
            )}

            <Content>
                {repositoriesList.map(item => (
                    <div key={item.full_name}>{item.full_name}</div>
                ))}

                {repositoriesList.length > 0 && (
                    <Pagination
                        defaultCurrent={1}
                        total={totalCount}
                        defaultPageSize={currentSearchPerPage}
                        showSizeChanger={false}
                        onChange={e => updatePage(e)}
                    />
                )}
            </Content>

            {isLoading && (
                <Loader
                    type="Puff"
                    color="#232aa8"
                    height={50}
                    width={50}
                    timeout={10000}
                />
            )}
        </Layout>
    );
}

export default App;
