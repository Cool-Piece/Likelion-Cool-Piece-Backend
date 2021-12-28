const checkUser = (req, res, next) => {
  if (!req.userInfo) {
    return res.status(400).json({ message: "user is not login!!" });
  }

  return next();
};

module.exports = checkUser;
