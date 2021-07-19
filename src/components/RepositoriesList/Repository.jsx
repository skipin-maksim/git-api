import React, { useEffect, useState } from "react";

import { fetchLanguages } from "../../services/gitAPI";
import SubList from "../SubList/SubList";

import s from "./Repository.module.scss";

const Repository = ({ item }) => {
    const [languages, setLanguages] = useState([]);

    const getLanguages = async () => {
        const data = await fetchLanguages(item.languages_url);

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
        </li>
    );
};

export default Repository;
