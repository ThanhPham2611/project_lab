import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserHistory } from "history";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

//local
import App from "./layouts";
import routes from "./routers";
import store from "./store";
import common_en from "./assets/translation/en/common.json";
import common_vi from "./assets/translation/vi/common.json";

//scss
import "antd/dist/reset.css";
import "./assets/scss/main.scss";

const queryClient = new QueryClient();
const browserHistory = createBrowserHistory();

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "vi",
  resources: {
    en: {
      common: common_en,
    },
    vi: {
      common: common_vi,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <CookiesProvider>
        <Router history={browserHistory}>
          <I18nextProvider i18n={i18next}>
            <App renderRouter={routes} />
          </I18nextProvider>
        </Router>
      </CookiesProvider>
    </Provider>
  </QueryClientProvider>
);
