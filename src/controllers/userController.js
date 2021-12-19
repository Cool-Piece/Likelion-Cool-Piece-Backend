export const getLogin = (req, res) => res.render("login");

export const githubAuth = (req, res, next) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.DB_URI,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  return res.redirect(finalUrl);
};

export const githubAuthCallback = (req, res, next) => {};
