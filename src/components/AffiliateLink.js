import React from "react";
import { Button, Collapsible, TextField } from "@shopify/polaris";

const AffiliateLink = ({ showAffiliateLink, account, toggleAffiliateLink }) => {
    return (
        <div style={{ margin: "20px auto", width: "400px" }}>
            <Button
                plain
                fullWidth
                onClick={() => {
                    toggleAffiliateLink();
                }}
            >
                Get affiliate link
            </Button>
            <div style={{ margin: "10px 0px" }}>
                <Collapsible open={showAffiliateLink}>
                    <div style={{ margin: "4px" }}>
                        <TextField
                            readOnly
                            value={window.location + "&affiliate=" + account}
                        />
                    </div>
                </Collapsible>
            </div>
        </div>
    );
};

export default AffiliateLink;