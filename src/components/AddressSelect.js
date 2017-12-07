import React from "react";
import { RadioButton } from "@shopify/polaris";
import AddressText from "./AddressText";
import { fullName } from "../utils/AddressUtils";

const AddressSelect = ({ address, updateMode }) => {
    return (
        <RadioButton
            label={fullName(address)}
            helpText={
                <AddressText address={address} updateMode={updateMode} />
            }
            checked
        />
    );
};

export default AddressSelect;