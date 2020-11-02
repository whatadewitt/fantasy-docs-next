// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const YahooFantasy = require("yahoo-fantasy");
const jwt = require("jsonwebtoken");
const request = require("request");

export default (req, res) => {
  let user, accessToken, refreshToken;

  const tokenCallback = ({ access_token, refresh_token }) => {
    return new Promise((resolve, reject) => {
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
          user = {
            id: body.sub,
            name: body.nickname,
            avatar: body.profile_images.image64,
          };
          accessToken = access_token;
          refreshToken = refresh_token;

          return resolve();
        }
      });
    });
  };

  const yf = new YahooFantasy(
    "dj0yJmk9S2dZMzNKb2FwMUQ2JmQ9WVdrOU1tczVURlEzVVRNbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTZm",
    "cb411e31a8260277fbe2ec820f57997be7ff717f",
    tokenCallback,
    "https://c64db9cbef1f.ngrok.io/auth/callback"
  );

  yf.authCallback(req, (err) => {
    if (err) {
      return res.json({ err });
    }

    return res.json({
      user: user,
      auth: jwt.sign(
        {
          accessToken,
          refreshToken,
        },
        "yahoo-keyboard-kitty"
      ),
    });
  });
};
