import s from "./Overlay.module.scss";

const Overlay = ({ children }) => {
    return <div className={s.overlay}>{children}</div>;
};

export default Overlay;
