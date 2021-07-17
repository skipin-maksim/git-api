import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { gitDataOperations, gitDataSelectors } from "./redux/gitData";

import "./App.module.scss";

function App() {
    const repositoriesList = useSelector(gitDataSelectors.getAllRepositoriesList);
    const dispatch = useDispatch();

    const getRepositories = useCallback(
        (searchQuery, page) =>
            dispatch(gitDataOperations.getRepositories(searchQuery, page)),
        [dispatch],
    );

    useEffect(() => {
        getRepositories("react", 1);
    }, [getRepositories]);

    return (
        <div>
            {repositoriesList.map(item => (
                <div>{item.full_name}</div>
            ))}
        </div>
    );
}

export default App;
