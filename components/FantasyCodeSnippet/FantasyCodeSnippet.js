import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { sunburst } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const FantasyCodeSnippet = ({ children }) => (
  <SyntaxHighlighter
    language="javascript"
    style={sunburst}
  >{`const YahooFantasy = require('yahoo-fantasy');
        const yf = new YahooFantasy(
          Y!APPLICATION_KEY,
          Y!APPLICATION_SECRET,
          tokenCallbackFn, // optional
          redirectUri // optional
        );
        
        yf.setUserToken(
          Y!OAuthAccessToken
        );
        
        // promise based
        try {
          ${children}
        } catch (e) {
          // handle error
        }

        // callback based
  );`}</SyntaxHighlighter>
);

export default FantasyCodeSnippet;
