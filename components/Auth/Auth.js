import React from "react";

import CodeBlock from "../CodeBlock/CodeBlock";

const Auth = () => {
  return (
    <>
      <h1>Authentication Using This Module</h1>
      <p>
        Starting with version 4.0, I have re-added some helper functions to the
        codebase to help with the authentication flow. If you've used this
        module prior to 4.0, you can continue with the format you have used,
        however, I found that I was spending a lot more time than I cared to
        setting up my applications. Finally I decided to add some code so users
        can get up and running a little bit quicker. These changes will also
        handle the token "refresh", as Yahoo! access tokens will expire after an
        hour.
      </p>

      <p>
        When initializing the module, there are now two additional optional
        parameters that you can add to your initialization, this page is meant
        to help explain those last 2 parameters.
      </p>
      <CodeBlock>
        {`const YahooFantasy = require('yahoo-fantasy');
const yf = new YahooFantasy(
  Y!APPLICATION_KEY,
  Y!APPLICATION_SECRET,
  tokenCallbackFn, // optional
  redirectUri // optional
);`}
      </CodeBlock>

      <h2>Token Callback</h2>

      <p>
        Starting in 4.0, the wrapper will listen for the "token expired" error
        and will attempt to automagically refresh the users access token. When
        this token has been refreshed successfully, the token callback will be
        triggered from the module's codebase.
      </p>

      <p>
        The token callback can be a simple function that you can use to to
        easily persist the user's access and refresh tokens to the storage
        mechanism of your choice. I've written a number of scripts where I store
        my user token in a Redis datastore to save myself from having to
        authenticate time and again, allowing my script to execute on a CRON.
        This code looks as follows:
      </p>

      <CodeBlock>
        {`
app.tokenCallback = function ({ access_token, refresh_token }) {
  return new Promise((resolve, reject) => {
    // client is redis client
    client.set("accessToken", access_token, (err, res) => {
      // could probably handle this with a multi... 
      // and you know... handle the errors...
      // good thing this is only an example!
      client.set("accessToken", access_token, (err, res) => {
        return resolve();
      })
    })
  });
};`}
      </CodeBlock>

      <p>
        The token callback function <strong>does</strong> expect a promise to be
        returned. This is because in my experience developing the functionality
        I was running into a lot of race conditions and this helped alleviate
        those problems.
      </p>

      <h2>Redirect URI</h2>
      <p>
        Adding last final parameter is really what helps with the authentication
        for your application users. The final param is the redirect URI that you
        have specified when setting up your application on the Yahoo! developer
        portal. You can then use that endpoint in your application to handle the
        three-legged Yahoo! authentication flow. In a typical express
        application that uses this module, you might see something like this:
      </p>

      <CodeBlock>
        {`app.yf = new YahooFantasy(
  Y!APP_KEY,
  Y!APP_SECRET,
  app.tokenCallback,
  "https://[MY_APP_URL]/auth/yahoo/callback"
);

app.get(
  "/auth/yahoo",
  (req, res) => {
    app.yf.auth(res);
  }
);

app.get("/auth/yahoo/callback", (req, res) => {
  app.yf.authCallback(req, (err) => {
    if (err) {
      return res.redirect("/error");
    }

    return res.redirect("/");
  });
});
`}
      </CodeBlock>

      <p>
        You can then have your users hit the <strong>/auth/yahoo</strong>{" "}
        endpoint, which will handle sending the user to the proper Yahoo! Login
        page. When the user has authenticated against the Yahoo! system, they'll
        be sent back to the <strong>/auth/yahoo/callback</strong> function,
        which will perform the final step of the OAuth flow and authenticate the
        user. Note that this flow will also set the access and refresh tokens
        and will trigger the token callback function, detailed above.
      </p>
    </>
  );
};

export default Auth;
