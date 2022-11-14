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
      "_id firstName lastName studentCode role isChangePassword"
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
      to: `thanhpt@relipasoft.com`,
      subject: "Thông báo tài khoản mật khẩu",
      text: "Testing send email",
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
    "-_id firstName lastName studentCode phone email avatarUrl role office class facebook tiktok instagram"
  );

  return res.json({
    user,
  });
};

/**
 * get all user
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getAllUser = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  try {
    const { role } = jwt.decode(token, { complete: true }).payload;
    if (role !== 0) {
      return res.status(401).send({ message: "you not admin!" });
    }
    const { inputSearch, office } = req.query;
    const condition = {};
    if (Number(office) === 0 || office) {
      condition.office = Number(office);
    }
    if (inputSearch)
      Object.assign(condition, {
        $or: [
          {
            studentCode: inputSearch,
          },
          {
            email: inputSearch,
          },
        ],
      });
    const listUsers = await User.find(condition, "-__v");
    return res.json({
      listUsers,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Something went wrong!" });
  }
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

/**
 * code verify
 * @param {*} req
 * @param {*} res
 * @returns
 */

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
