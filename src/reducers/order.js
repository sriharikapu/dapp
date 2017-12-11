import * as types from "../constants/ActionTypes";

export const orderStatus = (state = null, action) => {
    switch (action.type) {
        case types.UPDATE_ORDER_STATUS:
            return action.status;
        default:
            return state;
    }
};

export const orderSummary = (state = null, action) => {
    switch (action.type) {
        case types.ORDER_SUMMARY:
            return action.order;
        default:
            return state;
    }
};