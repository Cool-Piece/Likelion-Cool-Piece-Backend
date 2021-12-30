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

      const existUser = await User.findOne({ username: username });

      if (!existUser) {
        const newUser = await User.create({
          username: userData.login ? userData.login : "Unknown",
          socialLogin: "github",
          location: userData.location ? userData.location : "",
          avatar_url: userData.avatar_url,
        });

        const token = jwt.sign(
          {
            _id: newUser._id.toString(),
            username: newUser.username,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "1d",
          }
        );
        return res.json({ message: "ok", access_token: token });
      } else {
        const token = jwt.sign(
          {
            _id: existUser._id.toString(),
            username: existUser.username,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "1d",
          }
        );
        return res.json({ message: "ok", access_token: token });
      }
    } else {
      return res
        .status(403)
        .json({ result: "fail", message: "github token is wrong " });
    }
  } catch (error) {
    console.log(error, "err");
  }
};

export const logout = (req, res) => {
  return res.clearCookie("access_token");
};
