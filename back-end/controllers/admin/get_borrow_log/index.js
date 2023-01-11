import BorrowLog from "../../../model/borrowLogs";
import jwt from "jsonwebtoken";

export const getBorrowLog = async (req, res) => {
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
    const { deviceCode, size = 5, pagination = 0 } = req.query;
    const data = await BorrowLog.find({ deviceCode }, "-__v")
      .limit(size)
      .skip(pagination * size);
    return res.status(200).send({ data });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Fail" });
  }
};