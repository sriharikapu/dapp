import React from "react";
import { Subheading } from "@shopify/polaris";

const CartHeader = () => {
    return (
        <div style={{ display: "flex", width: "100%" }}>
            <div style={{ width: "100%" }} />
            <div
                style={{
                    display: "flex",
                    minWidth: "200px",
                    justifyContent: "center",
                    alignItems: "flex-end"
                }}
            >
                <Subheading>Price</Subheading>
            </div>

            <div
                style={{
                    display: "flex",
                    minWidth: "60px",
                    justifyContent: "center",
                    alignItems: "flex-end"
                }}
            >
                <Subheading>Quantity</Subheading>
            </div>
        </div>
    );
};

export default CartHeader;