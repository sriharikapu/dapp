import * as types from "../constants/ActionTypes";

export const account = (state = null, action) => {
    switch (action.type) {
        case types.ACCOUNT:
            return action.account;
        default:
            return state;
    }
};

export const balances = (state = null, action) => {
    switch (action.type) {
        case types.ETH_BALANCE:
            return {
                ...state,
                ETH: action.balance
            };
        case types.MARK_BALANCE:
            return {
                ...state,
                MARK: action.balance
            };
        case types.LOYALTY_BALANCE:
            return {
                ...state,
                loyalty: action.balance
            };
        default:
            return state;
    }
};