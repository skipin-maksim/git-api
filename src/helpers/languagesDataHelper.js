import starIcon from "../assets/star-icon.svg";
import watchersIcon from "../assets/watchers-icon.svg";

export const getDataForLeftList = (item, languages) => {
    const { name, owner, description } = item;
    return [
        { value: name, title: "Repo name" },
        { value: owner.login, title: "Author" },
        { value: languages, title: "Languages" },
        { value: description, title: "Description" },
    ];
};

export const getDataForRightList = item => {
    const { stargazers_count, watchers_count } = item;
    return [
        { value: stargazers_count, title: "stars", icon: starIcon },
        { value: watchers_count, title: "watchers", icon: watchersIcon },
    ];
};
