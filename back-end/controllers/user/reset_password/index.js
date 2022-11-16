const User = require("../../../model/user");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");

export const resetPassword = async (req, res) => {
  try {
    const existEmail = await User.findOne(
      {
        email: req.body.emailVerify,
      },
      "_id email"
    );
    if (!existEmail) {
      return res.status(401).send({ message: "Email not exist !" });
    }
    //codeRandom
    const passwordRandom = randomstring.generate(8);
    await User.updateOne(
      { email: existEmail.email },
      { codeResetPass: passwordRandom }
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
      html: `Account <b>${req.body.emailVerify},</b> code reset password: <b>${passwordRandom}</b> will be change after 24h`,
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
