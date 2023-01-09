import Users from "../../../model/user";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const postUserRegister = async (req, res) => {
  try {
    const { email, firstName, lastName, studentCode, password } = req.body;
    const checkExist = await Users.findOne({ studentCode }, "-__v");
    if (checkExist) {
      return res.status(409).send({ message: "Exist" });
    }
    const hashPassword = await bcrypt.hashSync(password, saltRounds);

    await Users.create({
      ...req.body,
      password: hashPassword,
      studentCode: studentCode.toLowerCase(),
      email: email.toLowerCase(),
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      isChangePassword: true,
    });
    return res.status(201).send({ message: "OK" });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Fail" });
  }
};
