const borrowEquiment = require("../../../model/borrowEquipment");

export const delRegisterDevice = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  try {
    const { id } = req.params;
    
    const checkExist = await borrowEquiment.findById(id);
    if (!checkExist) {
      return res.status(404).send({ message: "Not found" });
    }
    await borrowEquiment.findByIdAndDelete(id);
    return res.status(200).send({ message: "Xóa thành công" });
  } catch (err) {
    return res.status(404).send(err);
  }
};
