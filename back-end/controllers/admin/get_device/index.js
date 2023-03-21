import Device from "../../../model/devices";
import Users from "../../../model/user";
import InventoryDevice from "../../../model/inventoryDevice";
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
    if (role !== 0) {
      return res.status(401).send({ message: `You're not admin` });
    }

    const condition = {};
    const { deviceCode, deviceType, manager } = req.query;
    if (deviceCode) {
      condition.deviceCode = {
        $regex: `.*${deviceCode.trim()}.*`,
        $options: "i",
      };
    }
    if (deviceType) {
      condition.deviceType = deviceType;
    }
    if (manager) {
      condition.manager = manager;
    }
    const device = await Device.find(condition, "-__v");
    const newData = [];
    for (const item of device) {
      const getDeviceType = await InventoryDevice.findOne(
        { signatureDevice: item.deviceType },
        "nameDevice"
      );

      const getManager = await Users.findOne(
        { _id: item.manager },
        "firstName lastName"
      );
      newData.push({
        deviceName: item.deviceName,
        deviceLocation: item.deviceLocation,
        deviceCode: item.deviceCode,
        deviceType: getDeviceType.nameDevice,
        manager: `${getManager.firstName} ${getManager.lastName}`,
        purpose: item.purpose,
        status: item.status,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      });
    }

    return res.status(200).send({ data: newData });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err });
  }
};
