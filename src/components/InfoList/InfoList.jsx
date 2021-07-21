import s from "./InfoList.module.scss";

const InfoList = ({ list }) => {
    return (
        <ul className={s.sub_list}>
            {list?.map((item, idx) => (
                <li key={`id-${idx}`}>
                    <span>{item.title}:</span> {item.value}
                </li>
            ))}
        </ul>
    );
};

export default InfoList;
