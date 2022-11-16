const User = require("../../../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const saltRounds = 10;

export const AdminResetPassword = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  try {
    const { role } = jwt.decode(token, { complete: true }).payload;
    if (role !== 0) {
      return res.status(401).send({ message: "you not admin!" });
    }
    //codeRandom
    const passwordRandom = randomstring.generate(8);
    const update = await User.updateOne(
      { email: req.body.email },
      {
        password: bcrypt.hashSync(passwordRandom, saltRounds),
        isChangePassword: false,
      }
    );
    if (!update) {
      return res.status(401).send({ message: "Email not exits" });
    }
    return res.json({
      message: "Finish complete reset password account",
      passwordReset: passwordRandom,
      emailReset: req.body.email,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Something went wrong" });
  }
};
