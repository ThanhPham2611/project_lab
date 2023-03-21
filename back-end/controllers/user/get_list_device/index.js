import InventoryDevice from "../../../model/inventoryDevice";

export const getListDevice = async (req, res) => {
  try {
    const condition = {};
    const data = await InventoryDevice.find(condition, "-__v");
    return res.status(200).send({ data });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "Fail" });
  }
};
