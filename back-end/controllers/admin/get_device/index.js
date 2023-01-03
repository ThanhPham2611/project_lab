import Device from "../../../model/devices";
import jwt from "jsonwebtoken";

export const getDevice = async (req, res) => {
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

    const condition = {};
    const { deviceName, deviceCode, deviceType } = req.query;
    if (deviceName) {
      condition.deviceName = {
        $regex: `.*${deviceName.trim()}.*`,
        $options: "i",
      };
    }
    if (deviceCode) {
      condition.deviceCode = {
        $regex: `.*${deviceCode.trim()}.*`,
        $options: "i",
      };
    }
    if (deviceType) {
      condition.deviceType = deviceType;
    }
    const data = await Device.find(condition, "-__v");
    return res.status(200).send({ data });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err });
  }
};
