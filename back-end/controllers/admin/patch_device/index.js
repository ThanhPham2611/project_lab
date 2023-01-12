import Device from "../../../model/devices";
import BorrowLog from "../../../model/borrowLogs";
import Users from "../../../model/user";
import jwt from "jsonwebtoken";

export const patchDevice = async (req, res) => {
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
    const { userId, status } = req.body;
    const checkexist = await Device.findOne({ _id: id }, "-__v");
    if (!checkexist) {
      return res.status(404).send({ message: "Id not found" });
    }
    const userInfo = await Users.findOne({ _id: userId }, "-__v");
    await BorrowLog.create({
      deviceCode: checkexist.deviceCode,
      studentCode: userInfo.studentCode,
      borrowerName: `${userInfo.firstName} ${userInfo.lastName}`,
      status: status,
    });
    if (status === 1) {
      await Device.findByIdAndUpdate(id, {
        userId,
        status: status,
      });
    } else {
      await Device.findByIdAndUpdate(id, {
        $unset: { userId: 1 },
        status: status,
      });
    }
    return res.status(201).send({ message: "Ok" });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Fail" });
  }
};
