import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Auth_Token ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied." });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid." });
  }
};
