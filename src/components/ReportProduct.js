import React from "react";
import { Link } from "@shopify/polaris";

const linkStyle = {
    marginTop: "50px",
    display: "flex",
    justifyContent: "center"
};

const ReportProduct = ({ DIN }) => {
    return (
        <div style={linkStyle}>
            <Link
                url={
                    "mailto:info@kioskprotocol.com?Subject=Report%20product%20#" +
                    DIN
                }
            >
                Report this product
            </Link>
        </div>
    );
};

export default ReportProduct;