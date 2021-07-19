import s from "./SubList.module.scss";

const SubList = ({ list }) => {
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

export default SubList;
