const User = require("../../../model/user");
const jwt = require("jsonwebtoken");

export const updateInfo = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;
    const { avatarUrl, facebook, tiktok, instagram } = req.body;
    const update = await User.findByIdAndUpdate(
      { _id },
      {
        avatarUrl,
        facebook,
        tiktok,
        instagram,
      }
    );
    return res.json({
      message: "Change info success",
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "id not exist !" });
  }
};
