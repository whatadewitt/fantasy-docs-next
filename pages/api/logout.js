import { serialize } from "cookie";

export default (req, res) => {
  res.setHeader("Set-Cookie", [
    serialize("accessToken", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(),
    }),
    serialize("refreshToken", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(),
    }),
  ]);

  return res.json({ success: true });
};
