import React from "react";
import { Card } from "@shopify/polaris";
import blockies from "blockies";
import { formattedPrice } from "../utils/PriceUtils";

const Account = ({ account, balances, exchangeRates }) => {
    if (!account || !balances || !exchangeRates) {
        return null;
    }
    return (
        <Card title="Account">
            <Card.Section>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src={blockies({
                            seed: account
                        }).toDataURL()}
                        alt=""
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "20px"
                        }}
                    />
                    <p
                        style={{
                            fontFamily: "Courier",
                            fontWeight: "bold",
                            fontSize: "20px",
                            marginLeft: "20px"
                        }}
                    >
                        {account.substring(0, 10)}
                    </p>
                </div>
            </Card.Section>
            <Card.Section>
                <strong>Ether</strong>
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <p>{formattedPrice(balances.ETH, "ETH")}</p>
                    <p>{formattedPrice(balances.ETH, "USD", exchangeRates.USD)}</p>
                </div>
            </Card.Section>
        </Card>
    );
};

export default Account;

// <Card.Section>
//     <strong>Ethereum Bookstore</strong>
//     <div
//         style={{ display: "flex", justifyContent: "space-between" }}
//     >
//         <p>5,000.000 BOOK</p>
//         <p>$5.00</p>
//     </div>
// </Card.Section>