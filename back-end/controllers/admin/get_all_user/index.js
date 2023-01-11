const User = require("../../../model/user");
const jwt = require("jsonwebtoken");

export const getAllUser = async (req, res) => {
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
    const { inputSearch, office } = req.query;
    const condition = { isActive: true };
    if (Number(office) === 0 || office) {
      condition.office = Number(office);
    }
    if (inputSearch) {
      condition.studentCode = {
        $regex: `.*${inputSearch.trim()}.*`,
        $options: "i",
      };
    }

    const listUsers = await User.find(condition, "-__v");
    return res.json({
      listUsers,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Something went wrong!" });
  }
};
