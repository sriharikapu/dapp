import * as types from "../constants/ActionTypes";
import Kiosk from "../kiosk.js/src/index.js";
import Web3 from "web3";
import "whatwg-fetch";
import { getDINSuccess } from "./ProductActions";
import { fetchExchangeRate } from "./PriceActions";
import { urlParameter } from "../utils/URLUtils";

const initalizeKioskSuccess = (kiosk, web3) => ({
    type: types.INITIALIZE_KIOSK_SUCCESS,
    kiosk: kiosk
});

const metamask = available => ({
    type: types.METAMASK,
    available: available
});

const account = account => ({
    type: types.ACCOUNT,
    account: account
});

const ETHBalance = balance => ({
    type: types.ETH_BALANCE,
    balance: balance
});

const MARKBalance = balance => ({
    type: types.MARK_BALANCE,
    balance: balance
});

const loyaltyBalance = balance => ({
    type: types.LOYALTY_BALANCE,
    balance: balance
});

const loyaltyToken = token => ({
    type: types.LOYALTY_TOKEN,
    token: token
});

export const getAccount = () => async (dispatch, getState) => {
    const { kiosk } = getState();
    const accounts = await kiosk.web3.eth.getAccounts();
    if (accounts.length > 0) {
        const defaultAccount = accounts[0];
        dispatch(account(defaultAccount));
        dispatch(getUserBalances());
    }
};

export const getUserBalances = () => async (dispatch, getState) => {
    const { account } = getState();

    if (account) {
        const balances = await dispatch(getAccountBalances(account));

        dispatch(ETHBalance(balances.ETH));
        dispatch(MARKBalance(balances.MARK));

        if (balances.loyalty) {
            dispatch(loyaltyBalance(balances.loyalty));
        }
    }
};

export const getAccountBalances = account => async (dispatch, getState) => {
    const { product, kiosk, debug, loyaltyToken } = getState();

    const ETH = await kiosk.getETHBalance(account);
    const MARK = await kiosk.getMARKBalance(account);
    let loyalty;

    if (product && loyaltyToken) {
        loyalty = await kiosk.getERC20Balance(account, loyaltyToken);
    }

    const balances = {
        ETH: ETH,
        MARK: MARK,
        loyalty: loyalty
    };

    // Log the balances for debugging
    if (debug === true) {
        // console.log(balances);
    }

    return balances;
};

export const initializeKiosk = () => async (dispatch, getState) => {
    const { currency, web3Provider } = getState();

    let web3;

    // TODO: Add debug network (localhost)

    if (typeof window.web3 !== "undefined" && !web3Provider) {
        web3 = new Web3(window.web3.currentProvider);
        dispatch(metamask(true));
    } else {
        web3 = new Web3(
            new Web3.providers.HttpProvider(
                "https://kovan.infura.io/MswqGvkxMnwzGebFcH6N"
            )
        );
        dispatch(metamask(false));
    }

    const networkId = await web3.eth.net.getId();

    dispatch(fetchExchangeRate(currency.ticker));

    const kiosk = new Kiosk(web3, networkId);

    if (kiosk.web3) {
        dispatch(initalizeKioskSuccess(kiosk));

        const token = await kiosk.getLoyaltyToken();
        dispatch(loyaltyToken(token));

        dispatch(getAccount());

        const products = urlParameter("products");

        if (products) {
            const DINs = products.split(" ");
            dispatch(getDINSuccess(DINs[0]));
        }
    }
};