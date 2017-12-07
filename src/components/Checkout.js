import React, { Component } from "react";
import { connect } from "react-redux";
import { Page, Layout, DisplayText } from "@shopify/polaris";
import AddressContainer from "../containers/AddressContainer";
import PaymentContainer from "../containers/PaymentContainer";
import CartPopover from "../components/CartPopover";
import CurrencyPicker from "../components/CurrencyPicker";
import { pushRoute } from "../actions/NavigationActions";
import { toggleCartPreview } from "../actions/ProductActions";

const mapStateToProps = state => {
  return {
    product: state.product,
    prices: state.prices,
    showCartPreview: state.showCartPreview
  };
};

class Checkout extends Component {
  render() {
    const {
      product,
      prices,
      showCartPreview,
      pushRoute,
      toggleCartPreview
    } = this.props;

    if (!product) {
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
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px"
              }}
            >
              <DisplayText size="extraLarge">Checkout</DisplayText>
              <CartPopover
                product={product}
                show={showCartPreview}
                pushRoute={pushRoute}
                toggleCartPreview={toggleCartPreview}
              />
              <CurrencyPicker />
            </div>
            <AddressContainer />
            <PaymentContainer prices={prices} />
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}

export default connect(mapStateToProps, { pushRoute, toggleCartPreview })(
  Checkout
);