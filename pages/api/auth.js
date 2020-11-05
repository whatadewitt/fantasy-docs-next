const YahooFantasy = require("yahoo-fantasy");

export default (req, res) => {
  const yf = new YahooFantasy(
    process.env.YAHOO_CLIENT_ID ||
      "dj0yJmk9S2dZMzNKb2FwMUQ2JmQ9WVdrOU1tczVURlEzVVRNbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTZm",
    process.env.YAHOO_CLIENT_SECRET ||
      "cb411e31a8260277fbe2ec820f57997be7ff717f",
    null,
    `https://${process.env.APP_URL}/auth/callback`
  );

  // redirect url for after authentication
  const redirect = req.headers.referer.split(req.headers.host).pop();
  return yf.auth(res, redirect);
};
