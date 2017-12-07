import React from "react";
import { DisplayText } from "@shopify/polaris";

const lineItemStyle = {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%"
};

const totalStyle = {
    ...lineItemStyle
}

const Total = ({ price }) => {
    return (
        <div
            style={{
                margin: "20px 0px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                width: "300px"
            }}
        >
            <div style={totalStyle}>
                <DisplayText size="large">Total: {price}</DisplayText>
            </div>
        </div>
    );
};

export default Total;