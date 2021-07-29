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
            {repositoriesList.map(repository => (
                <Repository key={repository.id} repository={repository} />
            ))}
        </ul>
    );
};

export default RepositoriesList;
