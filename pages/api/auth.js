// const YahooFantasy = require("yahoo-fantasy");
import YahooFantasy from "yahoo-fantasy";

export default (req, res) => {
  const yf = new YahooFantasy(
    process.env.YAHOO_CLIENT_ID,
    process.env.YAHOO_CLIENT_SECRET,
    null,
    `https://${process.env.APP_URL}/auth/callback`
  );

  // redirect url for after authentication
  const redirect = req.headers.referer.split(req.headers.host).pop();
  return yf.auth(res, redirect);
};
