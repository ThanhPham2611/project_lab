const User = require("../../../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export const loginAuthen = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInfo = await User.findOne(
      {
        email,
      },
      "password"
    );
    if (!userInfo) {
      return res.status(404).send({ message: "User not exist" });
    }
    const samePassword = bcrypt.compareSync(password, userInfo.password);
    if (!samePassword) {
      return res.status(404).send({ message: "Email or password is wrong" });
    }
    const checkUser = await User.findOne({ email });
    if (!checkUser.isActive && checkUser.role != 0) {
      return res.status(401).send({ message: "Not active from admin" });
    }
    const user = await User.findOne(
      {
        email,
      },
      "_id firstName lastName studentCode role isChangePassword"
    );

    const accessToken = jwt.sign(
      JSON.parse(JSON.stringify(user)),
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "8h",
      }
    );
    return res.json({
      isChangePassword: user.isChangePassword,
      accessToken,
      message: "Login success !",
      role: user.role,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: err });
  }
};
