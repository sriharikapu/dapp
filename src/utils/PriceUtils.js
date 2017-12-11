export const formattedPrice = (wei, currency, exchangeRate) => {
    const weiPrice = parseInt(wei, 10);

    if (weiPrice === null || !currency) {
        return "--";
    }

    const eth = weiPrice / Math.pow(10, 18);

    switch (currency) {
        case "USD":
            const usdPrice = eth * exchangeRate;
            var formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2
            });
            return formatter.format(usdPrice);
        case "ETH":
            const formattedETHPrice = eth.toFixed(3) + " ETH";
            return formattedETHPrice;
        default:
            return "";
    }
};