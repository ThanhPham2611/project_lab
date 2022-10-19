const jwt = require("jsonwebtoken");

export const verifyToken = async (req, res, next) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied");
  }
  try {
    const verified = jwt.verify(token, process.env.SECRET_COOKIES);
    const currentTime = Date.now() / 1000;
    if (currentTime > verified.exp)
      return res.status(401).send("Token timeout");
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("Invalid token");
  }
};
