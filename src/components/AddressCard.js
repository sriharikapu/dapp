import React from "react";
import { Card, Collapsible, Button } from "@shopify/polaris";
import AddressSelect from "../components/AddressSelect";
import AddressForm from "../components/AddressForm";
import * as modes from "../constants/Modes";

const AddressCard = ({
    mode,
    name,
    address,
    showErrors,
    updateMode,
    updateAddress,
    saveAddress,
    cancelAddress
}) => {
    return (
        <Card sectioned title={"Shipping address"}>
            <Collapsible open={mode === modes.COMPLETE_PAYMENT}>
                <AddressSelect
                    name={name}
                    address={address}
                    updateMode={updateMode}
                />
            </Collapsible>
            <Collapsible open={mode === modes.NO_ADDRESS}>
                <Button plain onClick={() => updateMode(modes.ADD_ADDRESS)}>
                    + Add new address
                </Button>
            </Collapsible>
            <Collapsible
                open={mode === modes.ADD_ADDRESS || mode === modes.EDIT_ADDRESS}
            >
                <AddressForm
                    address={address}
                    showErrors={showErrors}
                    updateAddress={updateAddress}
                    saveAddress={saveAddress}
                    cancelAddress={cancelAddress}
                />
            </Collapsible>
        </Card>
    );
};

export default AddressCard;