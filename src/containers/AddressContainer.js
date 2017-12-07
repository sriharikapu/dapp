import React from "react";
import AddressCard from "../components/AddressCard";
import { connect } from "react-redux";
import {
    updateMode,
    updateAddress,
    saveAddress,
    cancelAddress
} from "../actions/AddressActions";

const AddressContainer = props => <AddressCard {...props} />;

const mapStateToProps = state => {
    return {
        mode: state.mode,
        address: state.address,
        showErrors: state.showErrors
    };
};

export default connect(mapStateToProps, {
    updateMode,
    updateAddress,
    saveAddress,
    cancelAddress
})(AddressContainer);