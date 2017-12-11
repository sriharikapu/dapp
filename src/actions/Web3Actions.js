import * as types from "../constants/ActionTypes";
import * as modes from "../constants/Modes";
import * as errors from "../constants/Errors";
import Kiosk from "kioskjs";
import Web3 from "web3";
import "whatwg-fetch";
import { getDINSuccess } from "./ProductActions";
import { fetchExchangeRate } from "./PriceActions";
import { urlParameter } from "../utils/URLUtils";

const initializeKioskSuccess = kiosk => ({
    type: types.INITIALIZE_KIOSK_SUCCESS,
    kiosk: kiosk
});

const web3Status = status => ({
    type: types.WEB3_STATUS,
    status: status
});

const web3Error = error => ({
    type: types.WEB3_ERROR,
    error: error
})

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

export const getAccount = web3 => async dispatch => {
    const accounts = await web3.eth.getAccounts();
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

export const initializeInfura = error => dispatch => {
    const web3 = new Web3(
        new Web3.providers.HttpProvider(
            "https://rinkeby.infura.io/MswqGvkxMnwzGebFcH6N"
        )
    );
    dispatch(web3Status(modes.READ_ONLY));
    const kiosk = new Kiosk(web3, "4");
    dispatch(initializeKioskSuccess(kiosk));
    dispatch(web3Error(error));
};

export const initializeKiosk = () => async (dispatch, getState) => {
    const { selectedCurrency } = getState();

    dispatch(fetchExchangeRate(selectedCurrency));

    if (typeof window.web3 !== "undefined") {
        const web3 = new Web3(window.web3.currentProvider);
        dispatch(web3Status(modes.READ_WRITE));
        const networkId = await web3.eth.net.getId();
        const kiosk = new Kiosk(web3, networkId);
        if (kiosk.web3) {
            dispatch(initializeKioskSuccess(kiosk));
            dispatch(getAccount(web3));
        } else {
            dispatch(initializeInfura(errors.WRONG_NETWORK));
        }
    } else {
        dispatch(initializeInfura(errors.NO_METAMASK));
    }

    const products = urlParameter("products");

    if (products) {
        const DINs = products.split(" ");
        dispatch(getDINSuccess(DINs[0]));
    }
};