import React from "react";
import { Thumbnail, TextStyle } from "@shopify/polaris";

const ProductSection = ({ product }) => {
    return (
        <div style={{ display: "flex", width: "100%" }}>
            <div style={{ width: "100px" }}>
                <Thumbnail source={product.image[0]} size="large" />
            </div>
            <div style={{ marginLeft: "20px", width: "100%" }}>
                <TextStyle variation="strong">{product.name}</TextStyle>
                <div style={{ marginTop: "4px" }}>
                    <TextStyle>{"DIN: " + product.DIN}</TextStyle>
                </div>
            </div>
        </div>
    );
};

export default ProductSection;