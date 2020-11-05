// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const YahooFantasy = require("yahoo-fantasy");
const request = require("request");

export default (req, res) => {
  // if (/localhost/.test(req.headers.host)) {
  //   return res.json({
  //     user: {
  //       id: "123456789",
  //       name: "dewberry-test",
  //       avatar:
  //         "https://secure.gravatar.com/avatar/d676f3728384b7f0ad416c4e9317fc6c?s=64",
  //       // id: null,
  //       // name: null,
  //       // avatar: null,
  //     },
  //   });
  // }

  let accessToken;
  const accessTokenCookie = req.headers?.cookie
    .split("; ")
    .find((c) => c.startsWith("accessToken"));

  if (accessTokenCookie) {
    accessToken = accessTokenCookie.split("=")[1];
  } else {
    res.status(401);
    return res.json({ error: "user not authorized" });
  }

  const options = {
    url: "https://api.login.yahoo.com/openid/v1/userinfo",
    method: "get",
    json: true,
    auth: {
      bearer: accessToken,
    },
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      return res.json({
        user: {
          id: body.sub,
          name: body.nickname,
          avatar: body.profile_images.image64,
        },
      });
    }
  });
};
