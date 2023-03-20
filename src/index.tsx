import React from "react";
import ReactDOM from "react-dom/client";
import thunk from "redux-thunk";
import App from "./components/App/App";
import { Provider } from "react-redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import { rootReducer } from "./services";
import "./index.css";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
