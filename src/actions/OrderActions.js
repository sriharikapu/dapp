import { urlParameter } from "../utils/URLUtils";
import * as types from "../constants/ActionTypes";
import * as modes from "../constants/Modes";
import { pushRoute } from "../actions/NavigationActions";
// import { privateKeys } from "../constants/Accounts";

const getAffiliate = () => {
    return urlParameter("affiliate")
        ? urlParameter("affiliate")
        : "0x0000000000000000000000000000000000000000";
};

const updateOrderStatus = status => dispatch => {
    if (status === modes.ORDER_SUCCESS) {
        dispatch(pushRoute("/success"));
    } else if (status === modes.ORDER_ERROR) {
        console.log("ERROR");
        dispatch(pushRoute("/success"));
    }

    dispatch({
        type: types.UPDATE_ORDER_STATUS,
        status: status
    });
};

// Send the shipping address to the URL set by the merchant.
// application/x-www-form-urlencoded
export const orderData = (txHash, nonce, address) => {
    // URL encode the order ID and nonce
    const txHashParam = "transactionHash=" + encodeURIComponent(txHash);
    const nonceParam = "nonce=" + encodeURIComponent(nonce);
    let data = [txHashParam, nonceParam];
    // URL encode the address
    for (let property in address) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(address[property]);
        if (encodedKey && encodedValue) {
            data.push(encodedKey + "=" + encodedValue);
        }
    }
    data = data.join("&");
    return data;
};

const handleOrderSuccess = (
    result,
    nonce,
    shippingAddress,
    product
) => dispatch => {
    const txHash = result.transactionHash;
    const data = orderData(txHash, nonce, shippingAddress);

    postCheckout(product.checkoutURL, data)
        .then(response => {
            dispatch(updateOrderStatus(modes.ORDER_SUCCESS));
        })
        .catch(error => {
            dispatch(updateOrderStatus(modes.ORDER_ERROR));
        });
};

const postCheckout = (checkoutURL, orderData) => {
    return fetch(checkoutURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: orderData
    });
};

const getOrder = (product, quantity, kiosk) => {
    const totalPrice = product.price * quantity;
    const affiliate = getAffiliate();
    return {
        DIN: product.DIN,
        quantity: quantity,
        totalPrice: totalPrice,
        priceValidUntil: product.priceValidUntil,
        affiliateReward: product.affiliateReward,
        loyaltyReward: product.loyaltyReward,
        merchant: product.merchant,
        affiliate: affiliate,
        loyaltyToken: product.loyaltyToken,
        signature: product.ecSignature
    };
};

export const buyProduct = () => async (dispatch, getState) => {
    const { kiosk, product, selectedQuantity, account, address } = getState();

    const order = getOrder(product, selectedQuantity, kiosk);

    // TODO: Hash a random UUID
    const nonce = "blah";
    const nonceHash = kiosk.hash(nonce);

    // TODO: Get loyalty balance
    // const loyaltyBalance = await kiosk.getERC20Balance(account, loyaltyToken);
    dispatch(updateOrderStatus(modes.ORDER_PENDING));

    try {
        const result = await kiosk.executeBuy(
            order,
            0, // TODO: Loyalty balance
            nonceHash,
            order.signature,
            account
        );
        if (result.events.LogError) {
            console.log(result);
        } else {
            dispatch(handleOrderSuccess(result, nonce, address, product));
        }
    } catch (error) {
        dispatch(updateOrderStatus(null));
    }
};