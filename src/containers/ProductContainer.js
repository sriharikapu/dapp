import React from "react";
import ProductCard from "../components/ProductCard";
import { connect } from "react-redux";
import { changeQuantity } from "../actions/ProductActions";
import { pushRoute } from "../actions/NavigationActions";

const ProductContainer = props => <ProductCard {...props} />;

const mapStateToProps = state => ({
    mode: state.mode,
    product: state.product,
    quantity: state.selectedQuantity,
    prices: state.prices
});

export default connect(mapStateToProps, {
    changeQuantity,
    pushRoute,
})(ProductContainer);