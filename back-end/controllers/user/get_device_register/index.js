const borrowEquipment = require("../../../model/borrowEquipment");
const jwt = require("jsonwebtoken");
import moment from "moment";

export const getDeviceRegister = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  const { _id } = jwt.decode(token, { complete: true }).payload;

  const { dateSearch, status } = req.query;

  const condition = {};
  if (dateSearch) {
    condition.borrowDate = moment(dateSearch).format("YYYY-MM-DD");
  }
  if (status) {
    condition.status = Number(status);
  }

  const dataBorrow = await borrowEquipment
    .find(
      {
        idCreator: _id,
        ...condition,
      },
      {
        __v: 0,
      }
    )
    .sort({
      createdAt: -1,
    });

  return res.json({
    dataBorrow,
  });
};
