import React from "react";
import { connect } from "react-redux";
import { Card } from "@shopify/polaris";
import { fullName, address1, address2 } from "../utils/AddressUtils";

const mapStateToProps = state => {
    return {
        address: state.address
    }
}

const Confirmation = ({ address }) => {
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
                        <div style={{ flex: "1", margin: "20px" }}>
                            <div style={{ marginBottom: "10px" }}>
                                <strong>Shipping Address</strong>
                            </div>
                            <p>{address ? fullName(address) : ""}</p>
                            <p>{address ? address1(address) : ""}</p>
                            <p>{address ? address2(address) : ""}</p>
                            <p>{address ? address.country : ""}</p>
                        </div>
                        <div style={{ flex: "1", margin: "20px" }}>
                            <div style={{ marginBottom: "10px" }}>
                                <strong>Order Summary</strong>
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                                <p>Transaction Hash:</p>
                                <p>Order ID:</p>
                                <p>DIN:</p>
                                <p>Quantity:</p>
                                <p>Total Price:</p>
                            </div>
                            <p>Proof of Purchase:</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(Confirmation);