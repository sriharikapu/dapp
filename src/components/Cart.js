import React, { Component } from "react";
import { connect } from "react-redux";
import { Page, Layout, DisplayText } from "@shopify/polaris";
import CurrencyPicker from "../components/CurrencyPicker";
import ProductContainer from "../containers/ProductContainer";

const mapStateToProps = state => {
    return {
        product: state.product,
        account: state.account,
        showAffiliateLink: state.showAffiliateLink
    };
};

class Cart extends Component {
    render() {
        if (!this.props.product) {
            // TODO: Loading and error states
            return null;
        }

        return (
            <Page>
                <Layout>
                    <Layout.Section>
                        <div
                            style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "30px"
                            }}
                        >
                            <DisplayText size="extraLarge">
                                Shopping Cart
                            </DisplayText>

                            <CurrencyPicker />
                        </div>
                        <div>
                            <ProductContainer />
                        </div>
                    </Layout.Section>
                </Layout>
            </Page>
        );
    }
}

export default connect(mapStateToProps)(Cart);