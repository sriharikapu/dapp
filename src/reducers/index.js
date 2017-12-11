import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { isValidAddress } from "../actions/AddressActions";
import * as types from "../constants/ActionTypes";
import * as modes from "../constants/Modes";
import { debug, kiosk, web3Status, web3Error } from "./web3";
import { prices, exchangeRates, selectedCurrency, loyaltyToken } from "./price";
import { account, balances } from "./account";
import { orderStatus, orderSummary } from "./order";

const DIN = (state = null, action) => {
    switch (action.type) {
        case types.GET_DIN_SUCCESS:
            return action.DIN;
        default:
            return state;
    }
};

const product = (state = null, action) => {
    switch (action.type) {
        case types.FETCH_PRODUCT_SUCCESS:
            return action.product;
        default:
            return state;
    }
};

const selectedQuantity = (state = 1, action) => {
    switch (action.type) {
        case types.CHANGE_QUANTITY:
            return action.quantity;
        default:
            return state;
    }
};

const cache = window.localStorage;

const initialAddressState = {
    email: cache.email ? cache.email : undefined,
    first_name: cache.first_name ? cache.first_name : undefined,
    last_name: cache.last_name ? cache.last_name : undefined,
    address1: cache.address1 ? cache.address1 : undefined,
    address2: cache.address2 ? cache.address2 : undefined,
    city: cache.city ? cache.city : undefined,
    province: cache.province ? cache.province : undefined,
    zip: cache.zip ? cache.zip : undefined
};

const address = (state = initialAddressState, action) => {
    switch (action.type) {
        case types.UPDATE_ADDRESS:
            return {
                ...state,
                [action.field]: action.value
            };
        default:
            return state;
    }
};

const initialMode = isValidAddress(initialAddressState)
    ? modes.COMPLETE_PAYMENT
    : modes.NO_ADDRESS;

const mode = (state = initialMode, action) => {
    switch (action.type) {
        case types.UPDATE_MODE:
            return action.mode;
        default:
            return state;
    }
};

const showErrors = (state = false, action) => {
    switch (action.type) {
        case types.SHOW_ADDRESS_ERRORS:
            return action.show;
        default:
            return state;
    }
};

const showCartPreview = (state = false, action) => {
    switch (action.type) {
        case types.SHOW_CART_PREVIEW:
            return action.show;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    debug,
    kiosk,
    web3Status,
    web3Error,
    DIN,
    account,
    balances,
    loyaltyToken,
    product,
    prices,
    selectedCurrency,
    exchangeRates,
    selectedQuantity,
    mode,
    address,
    showErrors,
    showCartPreview,
    orderStatus,
    orderSummary,
    router: routerReducer
});

export default rootReducer;