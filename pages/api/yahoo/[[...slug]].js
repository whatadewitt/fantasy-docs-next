const YahooFantasy = require("yahoo-fantasy");

export default async (req, res) => {
  const yf = new YahooFantasy(
    process.env.YAHOO_CLIENT_ID,
    process.env.YAHOO_CLIENT_SECRET
  );
  const {
    query: { slug },
    body,
  } = req;

  let accessToken;
  const accessTokenCookie = req.headers?.cookie
    .split("; ")
    .find((c) => c.startsWith("accessToken"));

  if (accessTokenCookie) {
    yf.setUserToken(accessTokenCookie.split("=")[1]);
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
