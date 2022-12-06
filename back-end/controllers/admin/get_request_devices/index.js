import BorrowDevice from "../../../model/borrowEquipment";
import jwt from "jsonwebtoken";

export const getRequestList = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  try {
    const { role } = jwt.decode(token, { complete: true }).payload;

    if (role !== 0) res.status(401).send({ message: `You're not admin` });
    const condition = {};
    const { search, status } = req.query;
    if (search) {
      condition.studentCode = {
        $regex: `.*${search.trim()}.*`,
        $options: "i",
      };
    }
    if (status) {
      condition.status = status;
    }
    const data = await BorrowDevice.find(condition, "-__v").sort({
      createdAt: -1,
    });
    return res.send({ data });
  } catch (err) {
    return res.status(400).send({ message: "Something went wrong" });
  }
};
