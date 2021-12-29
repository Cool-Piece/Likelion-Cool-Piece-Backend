import axios from "axios";
import User from "../models/User";
import jwt from "jsonwebtoken";

export const githubAuthCallback = async (req, res, next) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const options = {
    client_id: process.env.GITHUB_KEY,
    client_secret: process.env.GITHUB_SECRET,
    code: req.body.code,
  };
  const params = new URLSearchParams(options).toString();
  const finalUrl = `${baseUrl}?${params}`;

  try {
    const result = await axios({
      url: `${finalUrl}`,
      method: "post",
      headers: {
        Accept: "application/json",
      },
    });

    const tokenRequest = await result.data;
    console.log(tokenRequest, "data github tokne");

    if (tokenRequest.access_token) {
      const { access_token } = tokenRequest;
      const githubApi = "https://api.github.com";
      const userData = await (
        await axios({
          url: `${githubApi}/user`,
          headers: {
            Authorization: `token ${access_token}`,
          },
        })
      ).data;

      const username = userData.login;
      const user = await User.findOne({ username });

      if (!user) {
        const newUser = await User.create({
          username: userData.login ? userData.login : "Unknown",
          socialLogin: "github",
          location: userData.location ? userData.location : "",
        });
        const data = newUser.toJSON();
        const token = jwt.sign(
          {
            _id: data._id,
            username: data.username,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "1d",
          }
        );
        return res.status(200).json({ access_token: token });
      }
    } else {
      return res.status(403).json({ result: "fail", message: "exists User" });
    }
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  return res.clearCookie("access_token");
};
