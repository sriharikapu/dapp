import React, { Component } from "react";
import { connect } from "react-redux";
import { Popover, Button, ActionList } from "@shopify/polaris";
import { selectCurrency } from "../actions/PriceActions";

const mapStateToProps = state => {
    return {
        currency: state.selectedCurrency
    };
};

class CurrencyPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };
    }

    handleCurrencyChange(ticker) {
        this.setState({ active: false });
        this.props.selectCurrency(ticker);
    }

    render() {
        return (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ width: "100px" }}>
                    <Popover
                        active={this.state.active}
                        activator={
                            <Button
                                disclosure
                                onClick={() => {
                                    this.setState({
                                        active: !this.state.active
                                    });
                                }}
                            >
                                {this.props.currency}
                            </Button>
                        }
                        onClose={() => this.setState({ active: false })}
                    >
                        <ActionList
                            items={[
                                {
                                    content: "USD",
                                    onAction: () =>
                                        this.handleCurrencyChange("USD")
                                },
                                {
                                    content: "ETH",
                                    onAction: () =>
                                        this.handleCurrencyChange("ETH")
                                }
                            ]}
                        />
                    </Popover>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, { selectCurrency })(CurrencyPicker);