const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
const saltRounds = 10;

/**
 * Login function
 * @param {*} req
 * @param {*} res
 * @returns
 */

export const loginAuthen = async (req, res) => {
  try {
    const passwordHash = await User.findOne(
      {
        email: req.body.email,
      },
      "-_id password"
    );
    if (!passwordHash) {
      return res.status(401).send({ message: "User not exist" });
    }
    const samePassword = bcrypt.compareSync(
      req.body.password,
      passwordHash.password
    );
    if (!samePassword) {
      return res.status(401).send({ message: "Email or password is wrong" });
    }
    const user = await User.findOne(
      {
        email: req.body.email,
      },
      "_id firstName lastName code role isChangePassword"
    );

    const accessToken = jwt.sign(
      JSON.parse(JSON.stringify(user)),
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30000s",
      }
    );
    return res.json({
      isChangePassword: user.isChangePassword,
      accessToken,
      message: "Login success !",
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: err });
  }
};

/**
 * Register function
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const registerAuthen = async (req, res) => {
  const avatarUrl = req.body.avatarUrl
    ? req.body.avatarUrl
    : "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg";
  const { email, phone, lastName, firstName, code } = req.body;
  const passwordRandom = randomstring.generate(8);
  const existedUser = await User.findOne({ email }, "-password");
  if (existedUser) {
    return res.status(400).send({ message: "Email existed!" });
  }
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
    subject: "Thông báo tài khoản mật khẩu",
    text: "Testing send email",
    html: `<p>Thông tin tài khoản: ${email}</p>
    <p>Mật khẩu: ${passwordRandom}</p>`,
  });
  const hash = await bcrypt.hashSync(passwordRandom, saltRounds);
  try {
    await User.create({
      email,
      password: hash,
      phone,
      lastName,
      firstName,
      code,
      avatarUrl,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: "Something went wrong!" });
  }

  return res.status(201).send({
    userInfo: {
      email,
      phone,
      lastName,
      firstName,
      code,
      avatarUrl,
    },
  });
};

/**
 * update PW function
 * @param {*} req
 * @param {*} res
 * @returns
 */

export const updatePassword = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  const { _id, isChangePassword } = jwt.decode(token, {
    complete: true,
  }).payload;
  try {
    if (!isChangePassword) {
      const changePassword = await User.findByIdAndUpdate(
        { _id },
        {
          password: bcrypt.hashSync(req.body.newPassword, saltRounds),
          isChangePassword: true,
        }
      );
    } else {
      const passwordHash = await User.findOne(
        {
          _id,
        },
        "-_id password"
      );
      const samePassword = bcrypt.compareSync(
        req.body.oldPassword,
        passwordHash.password
      );
      if (!samePassword) {
        return res.status(401).send({ message: "Old password wrong" });
      }
      await User.updateOne(
        { _id },
        { password: bcrypt.hashSync(req.body.newPassword, saltRounds) }
      );
    }

    return res.json({
      message: "Change password success",
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Something went wrong !" });
  }
};

/**
 * get info
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getMyInfo = async (req, res, next) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  const { _id } = jwt.decode(token, { complete: true }).payload;
  const user = await User.findOne(
    { _id },
    "-_id firstName lastName code phone email avatarUrl role office class facebook tiktok instagram"
  );

  return res.json({
    user,
  });
};

/**
 * update edit info
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const updateInfo = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;
    const { avatarUrl, facebook, tiktok, instagram } = req.body;
    const update = await User.findByIdAndUpdate(
      { _id },
      {
        avatarUrl,
        facebook,
        tiktok,
        instagram,
      }
    );
    return res.json({
      message: "Change info success",
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "id not exist !" });
  }
};

/**
 * forget password
 * @param {*} req
 * @param {*} res
 * @returns
 */

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
    const passwordRandom = randomstring.generate(8);
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
      html: `Account <b>${req.body.emailVerify},</b> is reinstalled the password is <b>${passwordRandom}</b>, this password is the password's ban start and will be change after 24h `,
    });
    const hash = await bcrypt.hashSync(passwordRandom, saltRounds);
    await User.findByIdAndUpdate(
      { _id: existEmail._id },
      {
        password: hash,
        isChangePassword: false,
      }
    );
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
