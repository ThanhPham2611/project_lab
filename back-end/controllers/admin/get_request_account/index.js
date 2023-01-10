import Users from "../../../model/user";
import jwt from "jsonwebtoken";

export const getRequestAccount = async (req, res) => {
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
    const data = await Users.find({ isActive: false }, "-__v -password");
    return res.status(201).send({ data });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Fail" });
  }
};
