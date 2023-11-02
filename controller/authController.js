import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import Jwt from "jsonwebtoken";

import User from "../models/User.js";
import HttpStatus from "../utils/HttpStatus.js";

async function signUp(req, res, next) {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ status: HttpStatus.FAIL, data: { errors: errors.array() } });
  }

  try {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(422).json({
        status: HttpStatus.FAIL,
        data: { msg: "Email already exists" },
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      name,
      password: hashPassword,
    });
    await newUser.save();

    return res
      .status(201)
      .json({ status: HttpStatus.SUCCESS, data: { userId: newUser._id } });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
async function signIn(req, res, next) {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ status: HttpStatus.FAIL, data: { errors: errors.array() } });
  }

  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(422).json({
        status: HttpStatus.FAIL,
        data: { msg: "A User With This Email Not Found!" },
      });
    }

    const isSame = await bcrypt.compare(password, userExist.password);
    if (!isSame) {
      return res
        .status(422)
        .json({ status: HttpStatus.FAIL, data: { msg: "Wrong Password...!" } });
    }

    const token = Jwt.sign(
      { email: userExist.email, userId: String(userExist._id) },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      status: HttpStatus.SUCCESS,
      data: {
        token,
        userId: String(userExist._id),
        name: userExist.name,
        email: userExist.email,
        isAdmin: userExist.isAdmin,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export { signIn, signUp };
