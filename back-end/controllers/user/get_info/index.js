const User = require("../../../model/user");
const jwt = require("jsonwebtoken");

export const getMyInfo = async (req, res, next) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  const { _id } = jwt.decode(token, { complete: true }).payload;
  const user = await User.findOne(
    { _id },
    "-_id firstName lastName studentCode phone email avatarUrl role office class facebook tiktok instagram"
  );

  return res.json({
    user,
  });
};
