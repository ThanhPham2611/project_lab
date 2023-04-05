import moment from "moment";

const User = require("../../../model/user");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");

export const resetPassword = async (req, res) => {
  try {
    const existEmail = await User.findOne(
      {
        email: req.body.emailVerify,
      },
      "_id email isActive"
    );
    if (!existEmail.isActive) {
      return res.status(404).send({ message: "Not active" });
    }
    if (!existEmail) {
      return res.status(404).send({ message: "Email not exist !" });
    }
    //codeRandom
    const codeRandom = randomstring.generate(8);
    await User.updateOne(
      { email: existEmail.email },
      { codeResetPass: codeRandom, expiredTime: moment().add(5, "minutes") }
    );
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "thanh.pt2611@gmail.com",
        pass: process.env.PASSWORD_MAIL_SECRET,
      },
    });

    await transporter.sendMail({
      from: "adminTLU@gmail.com",
      to: `${req.body.emailVerify}`,
      subject: "Code reset password notification",
      html: `Account <b>${req.body.emailVerify},</b> code reset password: <b>${codeRandom}</b> will be expired after 5 minutes`,
    });
    return res.json({
      message: "Successfully sent the password to your email",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .send({ message: "Error sent the password to your email" });
  }
};
