import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers/index";
// import { composeWithDevTools } from "redux-devtools-extension"; // Causes an error with web3

export default function configureStore(history, initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunkMiddleware, routerMiddleware(history))
    );

    if (module.hot) {
        module.hot.accept("../reducers", () => {
            store.replaceReducer(rootReducer);
        });
    }

    return store;
}