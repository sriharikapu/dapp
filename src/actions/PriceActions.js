import * as types from "../constants/ActionTypes";

export const updateCurrency = ticker => dispatch => {
    dispatch({
        type: types.UPDATE_CURRENCY,
        ticker: ticker
    });
    dispatch(getPrices());
};

export const getPrices = () => (dispatch, getState) => {
    const { product, selectedQuantity, currency } = getState();
    if (product) {
        const total = dispatch(
            formattedPrice(product.price * selectedQuantity, currency)
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

const fetchExchangeRateSuccess = (ticker, ethPrice) => {
    return {
        type: types.UPDATE_CURRENCY,
        ticker: ticker,
        ethPrice: ethPrice
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
        dispatch(fetchExchangeRateSuccess(ticker, 400));
        dispatch(getPrices());
    }
};

export const formattedPrice = (wei, currency) => (dispatch, getState) => {
    const weiPrice = parseInt(wei, 10);

    if (!weiPrice || !currency) {
        return "--";
    }

    const eth = weiPrice / Math.pow(10, 18);

    switch (currency.ticker) {
        case "USD":
            const usdPrice = eth * currency.ethPrice;
            const decimalUSDPrice = usdPrice.toFixed(2);
            const formattedUSDPrice = "$" + decimalUSDPrice.toString();
            return formattedUSDPrice;
        case "ETH":
            const formattedETHPrice = eth.toFixed(3) + " ETH";
            return formattedETHPrice;
        default:
            return "";
    }
};