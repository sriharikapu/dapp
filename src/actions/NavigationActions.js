import { push } from "react-router-redux";

export const pushRoute = route => dispatch => {
    const fullRoute = route + window.location.search;
    dispatch(push(fullRoute));
};