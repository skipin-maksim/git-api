import React from "react";
import { useSelector } from "react-redux";
import { gitDataSelectors } from "../../redux/gitData";
import Repository from "./Repository";

import s from "./RepositoriesList.module.scss";

const RepositoriesList = () => {
    const repositoriesList = useSelector(
        gitDataSelectors.getAllRepositoriesList,
    );

    return (
        <ul className={s.repositories_list}>
            {repositoriesList.map(item => (
                <Repository key={item.id} item={item} />
            ))}
        </ul>
    );
};

export default RepositoriesList;
