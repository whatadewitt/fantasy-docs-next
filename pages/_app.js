import { Provider } from "../context/index";

import "normalize.css";
import "../styles/globals.scss";

function YahooFantasyDocs({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default YahooFantasyDocs;
