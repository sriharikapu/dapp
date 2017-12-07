import * as types from "../constants/ActionTypes";
import * as modes from "../constants/Modes";

const showAddressErrors = show => {
    return {
        type: types.SHOW_ADDRESS_ERRORS,
        show: show
    };
};

export const updateMode = mode => (dispatch, getState) => {
    dispatch({
        type: types.UPDATE_MODE,
        mode: mode
    });
};

export const updateAddress = (field, value) => {
    return {
        type: types.UPDATE_ADDRESS,
        field: field,
        value: value
    };
};

export const cancelAddress = () => (dispatch, getState) => {
    const { address } = getState();

    if (isValidAddress(address) === true) {
        dispatch(updateMode(modes.COMPLETE_PAYMENT));
    } else {
        dispatch(updateMode(modes.NO_ADDRESS));
    }
    
};

export const isValidAddress = address => {
    if (
        address.email &&
        address.first_name &&
        address.last_name &&
        address.address1 &&
        address.city &&
        address.province &&
        address.zip
    ) {
        return true;
    }
    return false;
};

const saveToLocalStorage = address => {
    for (var property in address) {
        if (address.hasOwnProperty(property)) {
            // TODO: Check if it's a string
            window.localStorage[property] = address[property];
        }
    }
};

export const saveAddress = () => (dispatch, getState) => {
    const { address } = getState();
    if (isValidAddress(address) === true) {
        saveToLocalStorage(address);
        dispatch(updateMode(modes.COMPLETE_PAYMENT));
    } else {
        dispatch(showAddressErrors(true));
    }
};