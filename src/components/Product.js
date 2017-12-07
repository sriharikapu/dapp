import React from "react";
import ProductSection from "../components/ProductSection";
import PriceSection from "../components/PriceSection";
import QuantityPicker from "../components/QuantityPicker";

const style = {
    display: "flex",
    width: "100%"
};

const Product = ({ product, quantity, prices, changeQuantity }) => {
    return (
        <div>
            <div style={style}>
                <div style={{ width: "100%" }}>
                    <ProductSection product={product} />
                </div>
                <div style={{ minWidth: "200px" }}>
                    <PriceSection prices={prices} />
                </div>
                <div style={{ minWidth: "60px" }}>
                    <QuantityPicker
                        quantity={quantity}
                        quantityOptions={["1", "2", "3", "4", "5"]}
                        changeQuantity={changeQuantity}
                    />
                </div>
            </div>
        </div>
    );
};

export default Product;