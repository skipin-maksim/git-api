import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import App from "./App";

import "antd/dist/antd.css";
import "./index.scss";

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Provider>
    </Router>,
    document.getElementById("root"),
);
