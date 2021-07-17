import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { gitDataActions } from "./redux/gitData";

import "./App.module.scss";

function App() {
    const dispatch = useDispatch();

    const getRepositories = useCallback(
        () => dispatch(gitDataActions.getRepositories()),
        [dispatch],
    );

    useEffect(() => {
        getRepositories();
    }, [getRepositories]);

    return <div>Настроено</div>;
}

export default App;
