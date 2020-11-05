const YahooFantasy = require("yahoo-fantasy");

export default async (req, res) => {
  const yf = new YahooFantasy(
    "dj0yJmk9S2dZMzNKb2FwMUQ2JmQ9WVdrOU1tczVURlEzVVRNbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTZm",
    "cb411e31a8260277fbe2ec820f57997be7ff717f"
  );
  const {
    query: { slug },
    body,
  } = req;

  console.log(body);
  if (slug.length < 2) {
    res.status(400);
    return res.json({ error: "invalid endpoint" });
  }

  const [resource, subresource] = slug;
  const { filters, subresources, ...keys } = body;

  console.log(resource, subresource);
  console.log(filters);
  console.log(subresources);
  if (!yf[resource][subresource]) {
    res.status(400);
    return res.json({ error: "invalid endpoint" });
  }

  const args = [];

  if (keys) {
    args.push(Object.values(keys));
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

  const data = await yf[resource][subresource](...args);

  return res.json(data);
};
