const User = require("../../../model/user");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
const saltRounds = 10;

export const sendCodeVerify = async (req, res) => {
  const { emailVerify, codeVerify } = req.body;
  try {
    const checkEmail = await User.findOne(
      {
        email: emailVerify,
      },
      "codeResetPass"
    );
    if (!checkEmail) {
      return res.status(401).send({ message: "Email not exist !" });
    }
    if (checkEmail.codeResetPass === codeVerify) {
      //codeRandom
      const passwordRandom = randomstring.generate(8);
      await User.updateOne(
        { email: emailVerify },
        {
          password: bcrypt.hashSync(passwordRandom, saltRounds),
          isChangePassword: false,
        }
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
        to: `thanhpt@relipasoft.com`,
        subject: "Password reset notification",
        text: "Testing send email",
        html: `Account <b>${emailVerify},</b> Password: <b>${passwordRandom}</b>, password will expire within 24 hours from the time of sending this letter, thank you.`,
      });
      return res.json({
        message: "New password has been sent to your email",
      });
    } else {
      return res.status(401).json({
        message: "Check the verification code again",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Something went wrong" });
  }
};
