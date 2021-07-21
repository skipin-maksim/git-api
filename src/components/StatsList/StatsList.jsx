import s from "./StatsList.module.scss";

const StatsList = ({ list }) => {
    return (
        <ul className={s.stats_list}>
            {list?.map((item, idx) => (
                <li key={`id-${idx}`}>
                    <img className={s.icon} src={item.icon} alt="stats" />
                    <span>{`${item.value} ${item.title}`}</span>
                </li>
            ))}
        </ul>
    );
};

export default StatsList;
