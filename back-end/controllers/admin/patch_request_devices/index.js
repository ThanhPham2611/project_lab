import BorrowDevice from "../../../model/borrowEquipment";
import jwt from "jsonwebtoken";

export const patchRequestList = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  try {
    const { role } = jwt.decode(token, { complete: true }).payload;

    if (role !== 0) res.status(401).send({ message: `You're not admin` });
    const { id } = req.params;
    const checkexist = await BorrowDevice.findOne({ _id: id }, "-__v");
    if (!checkexist) {
      return res.status(400).send({ message: "Form not found" });
    }
    await BorrowDevice.findByIdAndUpdate(id, { ...req.body });
    return res.status(200).send({ message: "Ok" });
  } catch (err) {
    return res.status(400).send({ message: "Something wentwrong" });
  }
};
