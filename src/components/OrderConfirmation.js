import React from "react";
import { connect } from "react-redux";
import { Card } from "@shopify/polaris";
import { fullName, address1, address2 } from "../utils/AddressUtils";

const mapStateToProps = state => {
    return {
        address: state.address,
        orderSummary: state.orderSummary
    };
};

const OrderConfirmation = ({ address, orderSummary }) => {
    let addressSection = null;

    if (address) {
        addressSection = (
            <div style={{ flex: "1", margin: "20px" }}>
                <div style={{ marginBottom: "10px" }}>
                    <strong>Shipping Address</strong>
                </div>
                <p>{fullName(address)}</p>
                <p>{address1(address)}</p>
                <p>{address2(address)}</p>
                <p>{address.country}</p>
            </div>
        );
    }

    let orderSummarySection = null;

    if (orderSummary) {
        orderSummarySection = (
            <div style={{ flex: "1", margin: "20px" }}>
                <div style={{ marginBottom: "10px" }}>
                    <strong>Order Summary</strong>
                </div>
                <p>{"Order ID: " + orderSummary.orderID}</p>
                <p>{"DIN: " + orderSummary.DIN}</p>
                <p>{"Quantity: " + orderSummary.quantity}</p>
                <p>{"Total Price: " + orderSummary.totalPrice}</p>
            </div>
        );
    }

    return (
        <div>
            <div style={{ textAlign: "center", margin: "50px" }}>
                <p className="Kiosk-DisplayText--Large">
                    Thank you for your order!
                </p>
            </div>
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center"
                }}
            >
                <Card>
                    <div
                        style={{
                            display: "flex",
                            width: "600px"
                        }}
                    >
                        {addressSection}
                        {orderSummarySection}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(OrderConfirmation);