import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { searchDataSelectors } from "./redux/searchData";
import { gitDataOperations, gitDataSelectors } from "./redux/gitData";

import "./App.module.scss";
import { useQuery } from "./utils/useQuery";

function App() {
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();
    const location = useLocation();

    const { getSearchValue, getPerPage, getPage } = searchDataSelectors;
    const { getAllRepositoriesList } = gitDataSelectors;

    const repositoriesList = useSelector(getAllRepositoriesList);
    const currentSearchValue = useSelector(getSearchValue);
    const currentSearchPerPage = useSelector(getPerPage);
    const currentSearchPage = useSelector(getPage);

    const nextPage = () => {
        history.push(
            `/?q=${currentSearchValue}&per_page=${currentSearchPerPage}&page=${
                currentSearchPage + 1
            }`,
        );
    };

    const fetchSearch = () => {
        const page = query.get("page");
        const searchQuery = query.get("q");

        dispatch(gitDataOperations.fetchRepositories(searchQuery, page));
    };

    useEffect(() => {
        if (!location.search)
            history.push(
                `/?q=${currentSearchValue}&per_page=${currentSearchPerPage}&page=${currentSearchPage}`,
            );

        if (location.search) fetchSearch();
    }, [location.search]);

    return (
        <div>
            <button onClick={nextPage}>Сменить страницу</button>

            {!repositoriesList.length && (
                <p>По вашему запросу ничего не найдено</p>
            )}

            {repositoriesList.map(item => (
                <div key={item.full_name}>{item.full_name}</div>
            ))}
        </div>
    );
}

export default App;
