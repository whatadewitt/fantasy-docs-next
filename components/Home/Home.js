import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Home = () => {
  return (
    <>
      <h1>Yahoo! Fantasy Sports API Wrapper for NodeJS</h1>
      <p>
        This is a node module created to wrap the Yahoo! Fantasy Sports API (
        <a href="https://developer.yahoo.com/fantasysports/guide/index.html">
          link
        </a>
        ). At the moment, not all subresources are available, nor are any of the
        'collection' elements. I do hope to add them, and they have been added
        to the code. If the token expires, the module will return a
        'token_expired' error.
      </p>
      <p>
        The API is designed to act as a helper for those interacting with the Y!
        Fantasy API. The goal is for ease of use for the user, both in terms of
        querying endpoints and parsing responses. I've noticed that in working
        with the API, the data is not always the easiest to understand, so
        hopefully what I have created here will help people out.
      </p>

      <h2>Installation</h2>
      <p>You can install the module via npm by running:</p>
      <SyntaxHighlighter
        language="shell"
        style={nightOwl}
        customStyle={{ padding: "1em" }}
      >
        $ npm install yahoo-fantasy
      </SyntaxHighlighter>

      <h2>Usage Notes</h2>
      <p>
        In version 2.0, OAuth2.0 became the only way to communicate with the
        Yahoo! API. This was done for a number of reasons, but I do believe this
        will make it a better module in terms of both security, and should make
        it easier to use. The OAuth token from Yahoo! lasts for only an hour, so
        if the response returned from Yahoo! is an error, you'll have to refresh
        the authentication token from within your app.
      </p>
      <p>
        You can view the source code for this project on{" "}
        <a
          href="https://github.com/whatadewitt/yahoofantasysandbox/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        . At the very least it will give you an idea of how you can use this
        module.
      </p>

      <h2>Licence</h2>
      <p>
        This module is available under the{" "}
        <a href="http://opensource.org/licenses/MIT">MIT Licence</a>
      </p>

      <h2>Bugs &amp; Issues</h2>
      <p>
        This project will always very much be a work in progress, and I'm not
        perfect. It's a labour of love and there will most certainly be bugs.
        Please report any issues via the{" "}
        <a
          href="https://github.com/whatadewitt/yfsapi/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub issues page
        </a>
        .
      </p>
    </>
  );
};

export default Home;
