// const YahooFantasy = require("yahoo-fantasy");
import YahooFantasy from "yahoo-fantasy";

export default async (req, res) => {
  const testRefreshFunction = (tokendata) => {
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
    console.log("REFRESHED TOKEN");
    console.log(tokendata);
    // const tokenData = "TOKEN DATA GOES HURRRRRR"
  };

  const yf = new YahooFantasy(
    process.env.YAHOO_CLIENT_ID,
    process.env.YAHOO_CLIENT_SECRET,
    testRefreshFunction
  );
  const {
    query: { slug },
    body,
  } = req;

  let accessToken;
  const accessTokenCookie = req.headers?.cookie
    .split("; ")
    .find((c) => c.startsWith("accessToken"));

  const refreshTokenCookie = req.headers?.cookie
    .split("; ")
    .find((c) => c.startsWith("refreshToken"));
  console.log(accessTokenCookie);

  if (accessTokenCookie) {
    yf.setUserToken(accessTokenCookie.split("=")[1]);
  }

  if (refreshTokenCookie) {
    yf.setRefreshToken(refreshTokenCookie.split("=")[1]);
  }

  if (slug.length < 2) {
    res.status(400);
    return res.json({ error: "invalid endpoint" });
  }

  const [resource, subresource] = slug;
  const { filters, subresources, ...keys } = body;

  if (!yf[resource][subresource]) {
    res.status(400);
    return res.json({ error: "invalid endpoint" });
  }

  const args = [];

  if (keys || keys.length) {
    args.push(...Object.values(keys).filter((v) => v !== null));
  }

  if (filters) {
    args.push(filters);
  }

  if (subresources) {
    args.push(subresources);
  }

  console.log(args);

  // cb - promise - case
  // 5 - 4 - i think this only happens with transactions.adddrop_player
  // 4 - 3 - would be key, filters, subs, callback
  // 3 - 2 - would be key, filters or subs, callback for collection
  // could be key, another key, callback too...
  // 2 - 1 - would be key or filters or subs, callback
  // 1 - 0 - callback only...

  try {
    const data = await yf[resource][subresource](...args);
    return res.json(data);
  } catch (e) {
    return res.json(e);
  }
};
