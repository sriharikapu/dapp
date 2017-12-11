import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { isValidAddress } from "../actions/AddressActions";
import * as types from "../constants/ActionTypes";
import * as modes from "../constants/Modes";

const debug = (state = false, action) => {
    return state;
};

const web3Provider = (state = null, action) => {
    switch (action.type) {
        case types.WEB3_PROVIDER:
            return action.web3Provider;
        default:
            return state;
    }
};

const infura = (state = null, action) => {
    return state;
};

const kiosk = (state = null, action) => {
    switch (action.type) {
        case types.INITIALIZE_KIOSK_SUCCESS:
            return action.kiosk;
        default:
            return state;
    }
};

const metamask = (state = false, action) => {
    switch (action.type) {
        case types.METAMASK:
            return action.available;
        default:
            return state;
    }
};

const DIN = (state = null, action) => {
    switch (action.type) {
        case types.GET_DIN_SUCCESS:
            return action.DIN;
        default:
            return state;
    }
};

const account = (state = null, action) => {
    switch (action.type) {
        case types.ACCOUNT:
            return action.account;
        default:
            return state;
    }
};

const balances = (state = null, action) => {
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

const loyaltyToken = (state = null, action) => {
    switch (action.type) {
        case types.LOYALTY_TOKEN:
            return action.token;
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

const initialPrices = {
    total: ""
};

// Formatted prices
const prices = (state = initialPrices, action) => {
    switch (action.type) {
        case types.UPDATE_PRICES:
            return action.prices;
        default:
            return state;
    }
};

const exchangeRates = (state = null, action) => {
    switch (action.type) {
        case types.ADD_EXCHANGE_RATE:
            return {
                ...state,
                [action.ticker]: action.exchangeRate
            };
        default:
            return state;
    }
};

const selectedCurrency = (state = "USD", action) => {
    switch (action.type) {
        case types.SELECT_CURRENCY:
            return action.ticker;
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

const orderStatus = (state = null, action) => {
    switch (action.type) {
        case types.UPDATE_ORDER_STATUS:
            return action.status;
        default:
            return state;
    }
};

const orderSummary = (state = null, action) => {
    switch (action.type) {
        case types.ORDER_SUMMARY:
            return action.order;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    debug,
    web3Provider,
    infura,
    kiosk,
    metamask,
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