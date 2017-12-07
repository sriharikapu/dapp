import React from "react";
import PaymentCard from "../components/PaymentCard";
import { connect } from "react-redux";
import { buyProduct } from "../actions/OrderActions";

const PaymentContainer = props => <PaymentCard {...props} />;

const mapStateToProps = state => {
    return {
        mode: state.mode,
        metamask: state.metamask,
        disclaimerChecked: state.checkedDisclaimer
    };
};

export default connect(mapStateToProps, { buyProduct })(
    PaymentContainer
);