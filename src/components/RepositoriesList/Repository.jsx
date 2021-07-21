import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";

import { fetchLanguages } from "../../services/gitAPI";

import InfoList from "../InfoList/InfoList";
import StatsList from "../StatsList/StatsList";
import Overlay from "../Overlay/Overlay";

import { gitDataSelectors } from "../../redux/gitData";

import starIcon from "../../assets/star-icon.svg";
import watchersIcon from "../../assets/watchers-icon.svg";

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
        { value: item.stargazers_count, title: "stars", icon: starIcon },
        { value: item.watchers_count, title: "watchers", icon: watchersIcon },
    ];

    useEffect(() => {
        getLanguages();
    }, []);

    return (
        <li className={s.repository}>
            <a
                className={s.repository_link}
                href={item.html_url}
                target="_blank"
            >
                <img
                    className={s.avatar}
                    src={item.owner.avatar_url}
                    alt="avatar"
                />

                <div className={s.content}>
                    <div className={s.left_content}>
                        <InfoList list={dataForLeftList} />
                    </div>

                    <div className={s.right_content}>
                        <StatsList list={dataForRightList} />
                    </div>
                </div>
            </a>

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
