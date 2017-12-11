import React, { Component } from "react";
import { connect } from "react-redux";
import { Page, Layout, DisplayText } from "@shopify/polaris";
import AddressContainer from "../containers/AddressContainer";
import PaymentContainer from "../containers/PaymentContainer";
import Account from "../components/Account";
import CartPopover from "../components/CartPopover";
import CurrencyPicker from "../components/CurrencyPicker";
import { pushRoute } from "../actions/NavigationActions";
import { toggleCartPreview } from "../actions/ProductActions";

const mapStateToProps = state => {
  return {
    account: state.account,
    balances: state.balances,
    exchangeRates: state.exchangeRates,
    product: state.product,
    prices: state.prices,
    showCartPreview: state.showCartPreview
  };
};

class Checkout extends Component {
  render() {
    const {
      account,
      balances,
      exchangeRates,
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
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
        <Layout>
          <Layout.Section secondary>
            <Account
              account={account}
              balances={balances}
              exchangeRates={exchangeRates}
            />
          </Layout.Section>
          <Layout.Section>
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