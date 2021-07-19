import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";

import { fetchLanguages } from "../../services/gitAPI";

import SubList from "../SubList/SubList";
import Overlay from "../Overlay/Overlay";

import { gitDataSelectors } from "../../redux/gitData";

import s from "./Repository.module.scss";

const Repository = ({ item }) => {
    const dispatch = useDispatch();
    const [languages, setLanguages] = useState([]);
    const isLoading = useSelector(gitDataSelectors.getIsLoading);

    const getLanguages = async () => {
        const data = await fetchLanguages(item.languages_url, dispatch);

        let stringLanguages = "";
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                stringLanguages += ` ${key}`;
            }
        }

        setLanguages(stringLanguages);
    };

    const dataForLeftList = [
        { value: item.name, title: "Repo name" },
        { value: item.owner.login, title: "Author" },
        { value: languages, title: "Languages" },
        { value: item.description, title: "Description" },
    ];

    const dataForRightList = [
        { value: item.stargazers_count, title: "stars" },
        { value: item.watchers_count, title: "watchers" },
    ];

    useEffect(() => {
        getLanguages();
    }, []);

    return (
        <li className={s.repository}>
            <div className={s.left_content}>
                <img src={item.owner.avatar_url} alt="avatar" />

                <SubList list={dataForLeftList} />
            </div>

            <div className={s.right_content}>
                <SubList list={dataForRightList} />
            </div>

            {isLoading && (
                <Overlay>
                    <Loader
                        type="Puff"
                        color="#232aa8"
                        height={50}
                        width={50}
                        timeout={10000}
                    />
                </Overlay>
            )}
        </li>
    );
};

export default Repository;
