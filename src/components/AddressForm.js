import React from "react";
import {
  FormLayout,
  TextField,
  Select,
  Button,
  ButtonGroup
} from "@shopify/polaris";
import { provinces } from "../utils/AddressUtils";

const AddressForm = ({
  address,
  showErrors,
  updateAddress,
  updateMode,
  saveAddress,
  cancelAddress
}) => {
  const spaceBetween = <div style={{ width: "20px" }} />;

  return (
    <div style={{ margin: "4px" }}>
      <FormLayout>
        <FormLayout.Group>
          <TextField
            value={address.email}
            placeholder="Email"
            error={showErrors && !address.email}
            onChange={value => updateAddress("email", value)}
            autoComplete
          />
        </FormLayout.Group>
        <FormLayout.Group>
          <TextField
            value={address.first_name}
            placeholder="First Name"
            error={showErrors && !address.first_name}
            onChange={value => updateAddress("first_name", value)}
            autoComplete
          />
          <TextField
            value={address.last_name}
            placeholder="Last Name"
            error={showErrors && !address.last_name}
            onChange={value => updateAddress("last_name", value)}
            autoComplete
          />
        </FormLayout.Group>
        <div style={{ display: "flex" }}>
          <div style={{ flex: "3" }}>
            <TextField
              value={address.address1}
              placeholder="Address"
              error={showErrors && !address.address1}
              onChange={value => updateAddress("address1", value)}
              autoComplete
            />
          </div>
          {spaceBetween}
          <div style={{ flex: "2" }}>
            <TextField
              value={address.address2}
              placeholder="Apt, suite, etc. (optional)"
              onChange={value => updateAddress("address2", value)}
              autoComplete
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ flex: "1" }}>
            <TextField
              value={address.city}
              placeholder="City"
              error={showErrors && !address.city}
              onChange={value => updateAddress("city", value)}
              autoComplete
            />
          </div>
          {spaceBetween}
          <div style={{ flex: "1" }}>
            <Select
              placeholder="State"
              value={address.province}
              error={showErrors && !address.province}
              options={provinces}
              onChange={value => updateAddress("province", value)}
              autoComplete
            />
          </div>
          {spaceBetween}
          <div style={{ flex: "1" }}>
            <TextField
              value={address.zip}
              placeholder="ZIP Code"
              minLength={5}
              maxLength={5}
              error={showErrors && !address.zip}
              onChange={value => updateAddress("zip", value)}
              autoComplete
            />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ButtonGroup>
            <Button primary size="large" onClick={() => saveAddress()}>
              Save
            </Button>
            <Button size="large" onClick={() => cancelAddress()}>
              Cancel
            </Button>
          </ButtonGroup>
        </div>
      </FormLayout>
    </div>
  );
};

export default AddressForm;