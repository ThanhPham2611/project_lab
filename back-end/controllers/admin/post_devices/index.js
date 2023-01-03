import Device from "../../../model/devices";
import User from "../../../model/user";
import DeviceSig from "../../../model/inventoryDevice";
import jwt from "jsonwebtoken";
import ShortUniqueId from "short-unique-id";

export const CreateDevices = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  try {
    const uid = new ShortUniqueId({ dictionary: "number", length: 5 });
    //check admin
    const { role } = jwt.decode(token, { complete: true }).payload;
    if (role !== 0) res.status(401).send({ message: `You're not admin` });

    const { deviceName, deviceType, manager } = req.body;

    const managerDevice = await User.findOne(
      { _id: manager },
      "firstName lastName"
    );

    const deviceObj = await DeviceSig.findOne({ signatureDevice: deviceType });

    await Device.create({
      ...req.body,
      deviceCode: `${deviceName
        .slice(0, 2)
        .toUpperCase()}${deviceType}${uid()}`,
      manager: `${managerDevice.firstName} ${managerDevice.lastName}`,
      deviceType: deviceObj.nameDevice,
    });
    return res.status(201).send({ message: "ok" });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "failed" });
  }
};
