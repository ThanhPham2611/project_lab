const User = require("../../../model/user");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
import moment from "moment";

const saltRounds = 10;

export const sendCodeVerify = async (req, res) => {
  const { emailVerify, codeVerify } = req.body;
  try {
    const checkEmail = await User.findOne(
      {
        email: emailVerify,
      },
      "codeResetPass expiredTime isActive"
    );
    if (!checkEmail.isActive) {
      return res.status(404).send({ message: "Not active" });
    }

    if (!checkEmail) {
      return res.status(404).send({ message: "Email not exist !" });
    }
    if (checkEmail.codeResetPass === codeVerify) {
      if (moment(checkEmail.expiredTime).format() >= moment().format()) {
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
          to: `${emailVerify}`,
          subject: "Thông báo đổi mật khẩu",
          html: `Tài khoản:  <b>${emailVerify},</b> Mật khẩu: <b>${passwordRandom}</b>, mật khẩu của bạn cần phải thay đổi sau 24h, nếu không thì mật khẩu này sẽ bị vô hiệu lực`,
        });
        await User.updateOne(
          { email: emailVerify },
          { $unset: { codeResetPass: 1, expiredTime: 1 } }
        );
        return res.json({
          message: "New password has been sent to your email",
        });
      } else {
        return res.status(404).send({ message: `Expired time` });
      }
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
