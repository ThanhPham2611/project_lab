const User = require("../../../model/user");
const borrowEquiment = require("../../../model/borrowEquipment");
const jwt = require("jsonwebtoken");
import moment from "moment";

const formatDate = "YYYY-MM-DD";

export const deviceRegister = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  const { _id } = jwt.decode(token, { complete: true }).payload;

  const {
    firstName,
    lastName,
    majors,
    studentCode,
    devices,
    borrowDate,
    returnDate,
    purpose,
  } = req.body;

  const user = await User.findOne({ _id }, "-_id email");

  const checkExist = await User.findOne({ studentCode });
  if (!checkExist) {
    return res.status(404).send({ message: "User not exist !" });
  }
  try {
    await borrowEquiment.create({
      idCreator: _id,
      creator: user.email,
      firstName,
      lastName,
      studentCode,
      majors,
      devices,
      borrowDate: moment(borrowDate).format(formatDate),
      returnDate: moment(returnDate).format(formatDate),
      purpose,
    });
    return res.status(201).send({ message: "Register success !" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "Something went wrong" });
  }
};
