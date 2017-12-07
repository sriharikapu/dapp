import { getUserBalances } from "./Web3Actions";
import { validateProduct } from "../utils/JSONUtils";
import { getPrices } from "../actions/PriceActions";
import * as types from "../constants/ActionTypes";
import "whatwg-fetch";

export const getDINSuccess = DIN => dispatch => {
    dispatch({
        type: types.GET_DIN_SUCCESS,
        DIN: DIN
    });
    dispatch(fetchProduct());
};

const fetchProductSuccess = product => ({
    type: types.FETCH_PRODUCT_SUCCESS,
    product: product
});

export const changeQuantity = value => dispatch => {
    dispatch({
        type: types.CHANGE_QUANTITY,
        quantity: parseInt(value, 10)
    });
    dispatch(getPrices());
};

export const toggleCartPreview = () => (dispatch, getState) => {
    const { showCartPreview } = getState();
    dispatch({
        type: types.SHOW_CART_PREVIEW,
        show: !showCartPreview
    });
};

export const fetchProduct = () => async (dispatch, getState) => {
    const { kiosk, DIN, debug } = getState();

    if (kiosk && DIN) {
        let baseURL;

        try {
            if (debug === true) {
                baseURL = "http://localhost:8080/products/";
            } else {
                baseURL = await kiosk.productURL(DIN);
            }
            const fullURL = baseURL + DIN;

            try {
                const product = await fetch(fullURL).then(response => {
                    return response.json();
                });
                const isValid = validateProduct(product);

                if (isValid === true) {
                    dispatch(fetchProductSuccess(product));
                    dispatch(getPrices());
                    // Get loyalty balance
                    dispatch(getUserBalances());
                } else {
                    console.log("Invalid product");
                }
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            console.log(err);
        }
    }
};