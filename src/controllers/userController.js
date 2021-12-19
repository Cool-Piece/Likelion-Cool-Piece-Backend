import axios from "axios";
import User from "../models/User";

export const getLogin = (req, res) => res.render("login");

export const githubAuth = (req, res, next) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GITHUB_KEY,
    allow_signup: false,
    scope: "read:user user:email",
  };

  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  return res.redirect(finalUrl);
};

export const githubAuthCallback = async (req, res, next) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const options = {
    client_id: process.env.GITHUB_KEY,
    client_secret: process.env.GITHUB_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(options).toString();
  const finalUrl = `${baseUrl}?${params}`;

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
    const user = await User.findOne({ username });

    if (!user) {
      const newUser = await User.create({
        username: userData.login ? userData.login : "Unknown",
        socialLogin: "github",
        location: userData.location ? userData.location : "",
      });
    }
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};
