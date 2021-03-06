import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, Route } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./store/configureStore";
import App from "./App";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import "@shopify/polaris/styles.css";
import "./index.css";

const DEBUG = false;
// const WEB3_PROVIDER = "http://localhost:9545";

const initialState = { debug: DEBUG };
const history = createBrowserHistory();
const store = configureStore(history, initialState);

render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route path="/" component={App} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/checkout" component={Checkout} />
                <Route exact path="/success" component={OrderConfirmation} />
            </div>
        </Router>
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();