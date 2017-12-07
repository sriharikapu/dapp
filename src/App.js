import { Component } from "react";
import { connect } from "react-redux";
import { initializeKiosk } from "./actions/Web3Actions";

class App extends Component {
    componentWillMount() {
        const { initializeKiosk } = this.props;
        window.addEventListener("load", initializeKiosk(), false);
    }

    render() {
        return null;
    }
}

export default connect(null, { initializeKiosk })(App);