import Users from "../../../model/user";
import jwt from "jsonwebtoken";

export const patchRequestAccount = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  try {
    //check admin
    const { role } = jwt.decode(token, { complete: true }).payload;
    if (role !== 0) res.status(401).send({ message: `You're not admin` });
    const { id } = req.params;
    const { isActive } = req.body;
    const checkExist = await Users.findOne({ _id: id });
    if (!checkExist) {
      return res.status(404).send({ message: "Not found" });
    }
    await Users.updateOne({ _id: id }, { isActive });
    return res.status(200).send({ message: "Ok" });
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: "Faild" });
  }
};
