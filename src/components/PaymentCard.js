import React from "react";
import { Card, Collapsible, Button, DisplayText } from "@shopify/polaris";
import * as modes from "../constants/Modes";
import * as errors from "../constants/Errors";

const PaymentCard = ({
  prices,
  mode,
  web3Status,
  web3Error,
  buyProduct,
  orderStatus
}) => {
  let payButton;

  if (web3Status !== modes.READ_WRITE) {
    if (web3Error === errors.NO_METAMASK) {
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
    } else if (web3Error === errors.WRONG_NETWORK) {
      payButton = (
        <div>
          <Button
            size="large"
            disabled
            loading={orderStatus === modes.ORDER_PENDING}
            onClick={buyProduct}
          >
            Pay with MetaMask
          </Button>
        </div>
      );
    }
  } else {
    payButton = (
      <Button
        primary
        size="large"
        loading={orderStatus === modes.ORDER_PENDING}
        onClick={buyProduct}
      >
        Pay with MetaMask
      </Button>
    );
  }

  let errorMessage = null;

  if (web3Error === errors.WRONG_NETWORK) {
    errorMessage = (
      <p
        style={{
          textAlign: "center",
          color: "black",
          marginTop: "20px"
        }}
      >
        Please connect to{" "}
        <strong style={{ color: "#EBB240" }}>Rinkeby Test Network</strong>
      </p>
    );
  }

  return (
    <Card sectioned title="Complete payment">
      <Collapsible open={mode === modes.COMPLETE_PAYMENT}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ margin: "20px" }}>{payButton}</div>
          <DisplayText size="large">Order Total: {prices.total}</DisplayText>
        </div>
        {errorMessage}
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