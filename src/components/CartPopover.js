import React from "react";
import { Popover, Button } from "@shopify/polaris";
import ProductSection from "./ProductSection";

const CartPopover = ({ product, show, toggleCartPreview, pushRoute }) => {
  return (
    <Popover
      active={show}
      activator={
        <Button plain disclosure size="large" onClick={toggleCartPreview}>
          1 item
        </Button>
      }
      onClose={toggleCartPreview}
      sectioned
    >
      <ProductSection product={product} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
          marginTop: "20px"
        }}
      >
        <Button fullWidth onClick={toggleCartPreview}>
          Continue Checkout
        </Button>
        <div style={{ width: "40px" }} />
        <Button primary fullWidth onClick={() => pushRoute("/cart")}>
          Return to Cart
        </Button>
      </div>
    </Popover>
  );
};

export default CartPopover;