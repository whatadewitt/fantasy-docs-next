import { serialize } from "cookie";

// const YahooFantasy = require("yahoo-fantasy");
import YahooFantasy from "yahoo-fantasy";
const request = require("request");

export default (req, res) => {
  const yf = new YahooFantasy(
    process.env.YAHOO_CLIENT_ID,
    process.env.YAHOO_CLIENT_SECRET,
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
