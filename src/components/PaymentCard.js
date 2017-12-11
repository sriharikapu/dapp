import React from "react";
import {
  Card,
  Collapsible,
  Button,
  DisplayText
} from "@shopify/polaris";
import * as modes from "../constants/Modes";

const PaymentCard = ({ prices, mode, metamask, buyProduct, orderStatus }) => {
  let payButton;

  if (!metamask) {
    payButton = (
      <button
        style={{
          backgroundColor: "Transparent",
          border: "none",
          outline: "none"
        }}
        onClick={() => {
          window.open("https://metamask.io/");
        }}
      >
        <img alt="" style={{ width: "250px" }} src={"metamask.png"} />
      </button>
    );
  } else {
    payButton = (
      <Button primary size="large" loading={orderStatus === modes.ORDER_PENDING} onClick={buyProduct}>
        Pay with MetaMask
      </Button>
    );
  }

  return (
    <Card sectioned title="Complete payment">
      <Collapsible open={mode === modes.COMPLETE_PAYMENT}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ margin: "20px" }}>{payButton}</div>
          <DisplayText size="large">Order Total: {prices.total}</DisplayText>
        </div>
      </Collapsible>
    </Card>
  );
};

export default PaymentCard;

// <div style={{ marginLeft: "20px" }}>
//   <ChoiceList
//     choices={[
//       {
//         label: "Apply loyalty tokens ($X.XX available)",
//         value: "yes"
//       },
//       {
//         label: "Do not apply loyalty tokens",
//         value: "no"
//       }
//     ]}
//     selected={["no"]}
//   />
// </div>;