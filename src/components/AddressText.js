import React from "react";
import { TextStyle, Button } from "@shopify/polaris";
import * as modes from "../constants/Modes";
import { addressString } from "../utils/AddressUtils";

const AddressText = ({ address, updateMode }) => {
    return (
        <div style={{ display: "flex" }}>
            <TextStyle variation="subdued">{addressString(address)}</TextStyle>
            <div style={{ margin: "0px 10px" }}>
                <Button plain onClick={() => updateMode(modes.EDIT_ADDRESS)}>
                    Edit
                </Button>
            </div>
        </div>
    );
};

export default AddressText;