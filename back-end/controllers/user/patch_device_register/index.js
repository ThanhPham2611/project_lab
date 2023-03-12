const borrowEquiment = require("../../../model/borrowEquipment");
import moment from "moment";

const formatDate = "YYYY-MM-DD";

export const extendRegister = async (req, res) => {
  try {
    const { id } = req.params;
    const { returnDate } = req.body;

    const checkExists = await borrowEquiment.findById(id);
    if (!checkExists) {
      return res.status(404).send({ message: "Not found" });
    }
    await borrowEquiment.findByIdAndUpdate(id, {
      borrowDate: moment().format(formatDate),
      returnDate: moment(returnDate).format(formatDate),
      status: 1,
    });

    return res.status(200).send({ message: "Update success !" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "Something went wrong" });
  }
};
