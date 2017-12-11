import React from "react";
import PaymentCard from "../components/PaymentCard";
import { connect } from "react-redux";
import { buyProduct } from "../actions/OrderActions";

const PaymentContainer = props => <PaymentCard {...props} />;

const mapStateToProps = state => {
    return {
        mode: state.mode,
        web3Status: state.web3Status,
        web3Error: state.web3Error,
        orderStatus: state.orderStatus
    };
};

export default connect(mapStateToProps, { buyProduct })(PaymentContainer);