// Import react utilities:
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// Import app component and store:
import App from "./App";
import { store } from "./store";

// Import style:
import "./index.css";

import axios from "axios";

axios.defaults.baseURL =
  `https://project-gaming-beyond-v2-production.up.railway.app/` ||
  "http://localhost:3000";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
