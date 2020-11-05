import { serialize } from "cookie";

const YahooFantasy = require("yahoo-fantasy");
const request = require("request");

export default (req, res) => {
  const yf = new YahooFantasy(
    process.env.YAHOO_CLIENT_ID ||
      "dj0yJmk9S2dZMzNKb2FwMUQ2JmQ9WVdrOU1tczVURlEzVVRNbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTZm",
    process.env.YAHOO_CLIENT_SECRET ||
      "cb411e31a8260277fbe2ec820f57997be7ff717f",
    null,
    `https://${process.env.APP_URL}/auth/callback`
  );

  yf.authCallback(req, (err, { access_token, refresh_token }) => {
    if (err) {
      return res.status(400).json({ err });
    }

    const options = {
      url: "https://api.login.yahoo.com/openid/v1/userinfo",
      method: "get",
      json: true,
      auth: {
        bearer: access_token,
      },
    };

    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const user = {
          id: body.sub,
          name: body.nickname,
          avatar: body.profile_images.image64,
        };

        console.log(user);
        res.setHeader("Set-Cookie", [
          serialize("accessToken", access_token, { path: "/", httpOnly: true }),
          serialize("refreshToken", refresh_token, {
            path: "/",
            httpOnly: true,
          }),
        ]);

        return res.json({ user: user });
      }
    });
  });
};
