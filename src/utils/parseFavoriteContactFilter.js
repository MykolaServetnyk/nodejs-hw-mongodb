import { contactTypes } from "../constants/contact-constants.js";

const parseBoolean = value => {
    if (typeof value !== "string") return;

    if (!["true", "false"].includes(value)) return;

    const parsedValue = Boolean(value);

    return parsedValue;
}

const parseContactFitlerParams = ({ type, favorite }) => {
    const parsedType = contactTypes.includes(type) ? type : null;
    const parsedFavorite = parseBoolean(favorite);

    return {
        type: parsedType,
        favorite: parsedFavorite,
    }
}

export default parseContactFitlerParams;
