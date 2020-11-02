// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const YahooFantasy = require("yahoo-fantasy");

export default (req, res) => {
  const yf = new YahooFantasy(
    "dj0yJmk9S2dZMzNKb2FwMUQ2JmQ9WVdrOU1tczVURlEzVVRNbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTZm",
    "cb411e31a8260277fbe2ec820f57997be7ff717f",
    () => {},
    "https://c64db9cbef1f.ngrok.io/auth/callback"
  );

  return yf.auth(res);
};
