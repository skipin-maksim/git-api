import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { gitDataOperations, gitDataSelectors } from "./redux/gitData";

import "./App.module.scss";

function App() {
    const dispatch = useDispatch();

    const repositoriesList = useSelector(
        gitDataSelectors.getAllRepositoriesList,
    );

    const fetchRepositories = useCallback(
        (searchQuery, page) =>
            dispatch(gitDataOperations.fetchRepositories(searchQuery, page)),
        [dispatch],
    );

    useEffect(() => {
        fetchRepositories("react", 1);
    }, [fetchRepositories]);

    return (
        <div>
            {repositoriesList.map(item => (
                <div>{item.full_name}</div>
            ))}
        </div>
    );
}

export default App;
