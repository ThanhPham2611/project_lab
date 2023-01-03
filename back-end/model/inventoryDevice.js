import mongoose from "mongoose";

const inventoryDeviceSchema = mongoose.Schema({
  signatureDevice: {
    require: true,
    type: String,
    unique: true,
  },
  nameDevice: {
    require: true,
    type: String,
  },
});

module.exports = mongoose.model("InventoryDevice", inventoryDeviceSchema);
