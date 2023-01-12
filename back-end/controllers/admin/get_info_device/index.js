import Device from "../../../model/devices";
import Users from "../../../model/user";
import InventoryDevice from "../../../model/inventoryDevice";
import jwt from "jsonwebtoken";

export const getInfoDevice = async (req, res) => {
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
    const { deviceCode } = req.query;
    const dataInfo = await Device.findOne({ deviceCode }, "-__v");
    if (!dataInfo) {
      return res.status(404).send({ message: "Not Exists" });
    }
    const getDeviceType = await InventoryDevice.findOne(
      { signatureDevice: dataInfo.deviceType },
      "nameDevice"
    );
    dataInfo.deviceType = getDeviceType.nameDevice;

    const nameUser = await Users.findOne({ _id: dataInfo.userId }, "-__v");

    return res.status(200).send({
      data: { dataInfo: dataInfo, nameUser },
      message: "Ok",
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Fail" });
  }
};
