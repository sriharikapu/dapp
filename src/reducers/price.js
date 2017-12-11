import * as types from "../constants/ActionTypes";

const initialPrices = {
    total: ""
};

// Formatted prices
export const prices = (state = initialPrices, action) => {
    switch (action.type) {
        case types.UPDATE_PRICES:
            return action.prices;
        default:
            return state;
    }
};

export const exchangeRates = (state = null, action) => {
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

export const selectedCurrency = (state = "USD", action) => {
    switch (action.type) {
        case types.SELECT_CURRENCY:
            return action.ticker;
        default:
            return state;
    }
};

export const loyaltyToken = (state = null, action) => {
    switch (action.type) {
        case types.LOYALTY_TOKEN:
            return action.token;
        default:
            return state;
    }
};