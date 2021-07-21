import { Input } from "antd";

import s from "./Form.module.scss";

const Form = ({ inputSearchValue, handleSubmit, handleOnChangeInput }) => {
    return (
        <form
            className={s.form}
            onSubmit={e => handleSubmit(inputSearchValue, e)}
        >
            <Input
                className={s.search_input}
                type="text"
                value={inputSearchValue}
                onChange={handleOnChangeInput}
            />
        </form>
    );
};

export default Form;
