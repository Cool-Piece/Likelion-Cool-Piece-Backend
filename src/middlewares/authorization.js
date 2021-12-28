import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY;

const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.locals.isAuthenticated = {};
    return next();
  }
  try {
    const decoded = jwt.verify(token, secretKey.key);
    req.userInfo = {
      _id: decoded._id,
      username: decoded.username,
    };
    res.locals.isAuthenticated = { username: decoded.username };
    return next();
  } catch (error) {
    res.status(500).json({ message: "jwt token error" });
  }
};

module.exports = verifyToken;
