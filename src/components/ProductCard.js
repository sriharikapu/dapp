import React from "react";
import { Card, Button } from "@shopify/polaris";
import CartHeader from "./CartHeader";
import Product from "./Product";
import Total from "./Total";

const ProductCard = ({
    product,
    prices,
    quantity,
    changeQuantity,
    pushRoute,
    currency
}) => {
    if (!product) {
        return null;
    }
    return (
        <div style={{ margin: "4px" }}>
            <Card sectioned>
                <Card.Section>
                    <CartHeader />
                </Card.Section>
                <Card.Section>
                    <Product
                        product={product}
                        quantity={quantity}
                        prices={prices}
                        changeQuantity={changeQuantity}
                        pushRoute={pushRoute}
                        currency={currency}
                    />
                </Card.Section>
                <Card.Section>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end"
                        }}
                    >
                        <div>
                            <Total price={prices.total} />
                        </div>
                        <Button
                            primary
                            size="large"
                            onClick={() => pushRoute("/checkout")}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                </Card.Section>
            </Card>
        </div>
    );
};

export default ProductCard;