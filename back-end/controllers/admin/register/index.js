const User = require("../../../model/user");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
const saltRounds = 10;

export const registerAuthen = async (req, res) => {
  const {
    email,
    phone,
    lastName,
    firstName,
    avatarUrl,
    majors,
    role,
    office,
    studentCode,
    birthday,
  } = req.body;
  const passwordRandom = randomstring.generate(8);
  const existedUser = await User.findOne({ email }, "-password");
  if (existedUser) {
    return res.status(400).send({ message: "Email existed!" });
  }
  const hash = await bcrypt.hashSync(passwordRandom, saltRounds);
  try {
    await User.create({
      email,
      password: hash,
      studentCode: studentCode.toLowerCase(),
      majors,
      phone,
      lastName: lastName.toLowerCase(),
      firstName: firstName.toLowerCase(),
      avatarUrl,
      role,
      office,
      birthday,
      isChangePassword: false,
      isActive: true,
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "thanh.pt2611@gmail.com",
        pass: process.env.PASSWORD_MAIL_SECRET,
      },
    });

    await transporter.sendMail({
      from: "adminTLU@gmail.com",
      to: `${email}`,
      subject: "Thông báo tài khoản mật khẩu",
      text: "Hệ thống Labmanagement",
      html: `<p>Thông tin tài khoản: ${email}</p>
      <p>Mật khẩu: ${passwordRandom}</p>`,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: "Something went wrong!" });
  }
  return res.status(201).send({
    userInfo: {
      email,
      password: passwordRandom,
      role,
      office,
    },
  });
};
