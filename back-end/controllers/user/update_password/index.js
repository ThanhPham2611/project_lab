const User = require("../../../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

export const updatePassword = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  const { _id, isChangePassword } = jwt.decode(token, {
    complete: true,
  }).payload;
  try {
    if (!isChangePassword) {
      await User.findByIdAndUpdate(
        { _id },
        {
          password: bcrypt.hashSync(req.body.newPassword, saltRounds),
          isChangePassword: true,
        }
      );
    } else {
      const passwordHash = await User.findOne(
        {
          _id,
        },
        "-_id password"
      );
      const samePassword = bcrypt.compareSync(
        req.body.oldPassword,
        passwordHash.password
      );
      if (!samePassword) {
        return res.status(401).send({ message: "Old password wrong" });
      }
      await User.updateOne(
        { _id },
        { password: bcrypt.hashSync(req.body.newPassword, saltRounds) }
      );
    }

    return res.json({
      message: "Change password success",
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Something went wrong !" });
  }
};
