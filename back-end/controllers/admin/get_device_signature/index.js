import DeviceSig from "../../../model/inventoryDevice";
import jwt from "jsonwebtoken";

export const getDeviceSignature = async (req, res) => {
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
    const data = await DeviceSig.find({}, "-__v");
    return res.status(200).send({ data });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Failed" });
  }
};
