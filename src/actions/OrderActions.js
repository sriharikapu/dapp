import { urlParameter } from "../utils/URLUtils";
// import { privateKeys } from "../constants/Accounts";

const getAffiliate = () => {
    return urlParameter("affiliate")
        ? urlParameter("affiliate")
        : "0x0000000000000000000000000000000000000000";
};

// Send the shipping address to the URL set by the merchant.
// application/x-www-form-urlencoded
export const orderData = (orderID, nonce, address) => {
    // URL encode the order ID and nonce
    const idParam = "id=" + encodeURIComponent(orderID);
    const nonceParam = "nonce=" + encodeURIComponent(nonce);
    let data = [idParam, nonceParam];
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

const handleOrderSuccess = (result, nonce) => (dispatch, getState) => {
    console.log("SUCCESS!");
    const { address, product } = getState();

    const orderID = result.events.NewOrder.returnValues.orderID;
    const data = orderData(orderID, nonce, address);

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
    const { kiosk, product, selectedQuantity, account } = getState();

    // Validate product
    // Validate address

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

        console.log(result);

        if (result.events.NewOrder) {
            handleOrderSuccess(result, nonce);
        } else if (result.events.LogError) {
            console.log("ERROR!");
            console.log(result);
        }
    } catch (error) {
        console.log("ERROR!");
        console.log(error);
    }
};