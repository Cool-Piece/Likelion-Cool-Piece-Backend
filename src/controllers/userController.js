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
            _id: newUser._id,
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
            _id: existUser._id,
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
  res.clearCookie("access_token");
  return res.json({ message: "ok" });
};

const secretKey = process.env.SECRET_KEY;
const BEARER = "Bearer";

function parseToken(authorization) {
  if (!authorization) {
    return;
  }
  return authorization.slice(BEARER.length);
}

export const getUserInfo = async (req, res, next) => {
  const authorization = req.get("Authorization");

  try {
    const accessToken = parseToken(authorization);
    const decoded = jwt.verify(accessToken, secretKey);
    const { username } = decoded;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "can not find User" });
    }

    return res.json({
      userId: user._id,
      username,
      avatar_url: user.avatar_url,
      interested_skills: user.interested_skills,
      location: user.location,
    });
  } catch (error) {
    console.log(error, "error");
    if (err instanceof JsonWebTokenError) {
      return res.status(401).json({ message: "jwt token invalid" });
    }
  }
};
