const User = require("../../../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export const loginAuthen = async (req, res) => {
  try {
    const passwordHash = await User.findOne(
      {
        email: req.body.email,
      },
      "-_id password"
    );
    if (!passwordHash) {
      return res.status(401).send({ message: "User not exist" });
    }
    const samePassword = bcrypt.compareSync(
      req.body.password,
      passwordHash.password
    );
    if (!samePassword) {
      return res.status(401).send({ message: "Email or password is wrong" });
    }
    const user = await User.findOne(
      {
        email: req.body.email,
      },
      "_id firstName lastName studentCode role isChangePassword"
    );

    const accessToken = jwt.sign(
      JSON.parse(JSON.stringify(user)),
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30000s",
      }
    );
    return res.json({
      isChangePassword: user.isChangePassword,
      accessToken,
      message: "Login success !",
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: err });
  }
};
