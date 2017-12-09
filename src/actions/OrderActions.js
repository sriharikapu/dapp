import { urlParameter } from "../utils/URLUtils";
// import { privateKeys } from "../constants/Accounts";

const getAffiliate = () => {
    return urlParameter("affiliate")
        ? urlParameter("affiliate")
        : "0x0000000000000000000000000000000000000000";
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

const handleOrderSuccess = (result, nonce, shippingAddress, product) => {
    const txHash = result.transactionHash;
    const data = orderData(txHash, nonce, shippingAddress);

    console.log(txHash);
    console.log(data);

    postCheckout(product.checkoutURL, data)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            // TODO: Handle error
            console.log(error);
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

    try {
        const result = await kiosk.executeBuy(
            order,
            0, // TODO: Loyalty balance
            nonceHash,
            order.signature,
            account
        );
        if (result.events.LogError) {
            console.log("ERROR!");
            console.log(result);
        } else {
            console.log("SUCCESS!");
            handleOrderSuccess(result, nonce, address, product);
        }
    } catch (error) {
        console.log("ERROR!");
        console.log(error);
    }
};