import * as types from "../constants/ActionTypes";

export const debug = (state = false, action) => {
    return state;
};

export const web3Status = (state = "NO_WEB3", action) => {
    switch (action.type) {
        case types.WEB3_STATUS:
            return action.status;
        default:
            return state;
    }
};

export const web3Error = (state = null, action) => {
    switch (action.type) {
        case types.WEB3_ERROR:
            return action.error;
        default:
            return state;
    }
};

export const kiosk = (state = null, action) => {
    switch (action.type) {
        case types.INITIALIZE_KIOSK_SUCCESS:
            return action.kiosk;
        default:
            return state;
    }
};