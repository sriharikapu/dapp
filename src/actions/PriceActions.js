import * as types from "../constants/ActionTypes";
import { formattedPrice } from "../utils/PriceUtils";

export const selectCurrency = ticker => dispatch => {
    dispatch({
        type: types.SELECT_CURRENCY,
        ticker: ticker
    });
    dispatch(getPrices());
};

export const getPrices = () => (dispatch, getState) => {
    const {
        product,
        selectedQuantity,
        selectedCurrency,
        exchangeRates
    } = getState();
    if (product) {
        const total = formattedPrice(
            product.price * selectedQuantity,
            selectedCurrency,
            exchangeRates ? exchangeRates[selectedCurrency] : 0
        );
        const newPrices = {
            total: total
        };
        dispatch({
            type: types.UPDATE_PRICES,
            prices: newPrices
        });
    }
};

const fetchExchangeRateSuccess = (ticker, exchangeRate) => {
    return {
        type: types.ADD_EXCHANGE_RATE,
        ticker: ticker,
        exchangeRate: exchangeRate // Currency units (e.g., USD) / ETH
    };
};

export const fetchExchangeRate = ticker => async dispatch => {
    const tickerPair = "eth" + ticker.toLowerCase();
    try {
        const data = await fetch(
            "https://api.infura.io/v1/ticker/" + tickerPair
        ).then(response => {
            return response.json();
        });
        const ethPrice = data.ask;
        dispatch(fetchExchangeRateSuccess(ticker, ethPrice));
        dispatch(getPrices());
    } catch (error) {
        console.log(error);
        // TODO: Better fallback
        dispatch(fetchExchangeRateSuccess(ticker, 400));
        dispatch(getPrices());
    }
};