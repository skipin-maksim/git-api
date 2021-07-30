import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";

import {
    creatDataForLeftList,
    createDataForRightList,
} from "../../helpers/languagesDataHelper";
import { fetchLanguages } from "../../services/gitAPI";
import { gitDataSelectors } from "../../redux/gitData";

import InfoList from "../InfoList/InfoList";
import StatsList from "../StatsList/StatsList";
import Overlay from "../Overlay/Overlay";

import s from "./Repository.module.scss";

const Repository = ({ repository }) => {
    const [languages, setLanguages] = useState([]);
    const isLoading = useSelector(gitDataSelectors.getIsLoading);

    const getLanguages = async () => {
        const data = await fetchLanguages(repository.languages_url);

        let stringLanguages = "";

        if (data?.status) {
            setLanguages(data.message);
            return;
        }

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                stringLanguages += ` ${key}`;
            }
        }
        setLanguages(stringLanguages);
    };

    const dataForLeftList = creatDataForLeftList(repository, languages);
    const dataForRightList = createDataForRightList(repository);

    useEffect(() => {
        getLanguages();
    }, []);

    const { html_url, owner } = repository;
    return (
        <li className={s.repository}>
            <a
                className={s.repository_link}
                href={html_url}
                target="_blank"
                rel="noreferrer"
            >
                <img className={s.avatar} src={owner.avatar_url} alt="avatar" />

                <div className={s.content}>
                    <InfoList list={dataForLeftList} />

                    <StatsList list={dataForRightList} />
                </div>
            </a>

            {isLoading && (
                <Overlay>
                    <div style={{ padding: "20px", width: "100%" }}>
                        <Skeleton active avatar paragraph={{ rows: 2 }} />
                    </div>
                </Overlay>
            )}
        </li>
    );
};

export default Repository;
