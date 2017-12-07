import React from "react";
import { DisplayText } from "@shopify/polaris";

const PriceSection = ({ prices }) => {
    let reward = null;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <DisplayText size="large">{prices.total}</DisplayText>
            {reward}
        </div>
    );
};

export default PriceSection;

// TODO: Loyalty reward
// if (prices.loyaltyReward > 0) {
//     reward = (
//         <Tooltip content="Loyalty token reward">
//             <TextStyle variation="positive">{"+ " + prices.total}</TextStyle>
//         </Tooltip>
//     );
// }