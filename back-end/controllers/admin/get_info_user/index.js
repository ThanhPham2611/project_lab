const User = require("../../../model/user");
const jwt = require("jsonwebtoken");

export const getInfoUser = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  try {
    const { role } = jwt.decode(token, { complete: true }).payload;
    if (role !== 0) {
      return res.status(401).send({ message: "You not admin!" });
    }
    const { idUser } = req.body;
    const userInfo = await User.findOne({ _id: idUser }, "-__v -password");
    if (!userInfo) {
      return res.status(400).send({ message: "User not exist" });
    }
    return res.json({
      userInfo,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "Something went wrong" });
  }
};
