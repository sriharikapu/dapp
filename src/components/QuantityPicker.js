import React from "react";
import { Select } from "@shopify/polaris";

const QuantityPicker = ({ quantity, quantityOptions, changeQuantity }) => {
    return (
        <Select
            value={quantity}
            options={quantityOptions}
            onChange={value => changeQuantity(value)}
        />
    );
};

export default QuantityPicker;