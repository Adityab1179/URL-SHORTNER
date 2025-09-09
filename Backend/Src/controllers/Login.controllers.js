const UserSchema = require("../models/User.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const errors = {};

    if (!firstName) {
      errors.firstName = "First Name is required";
    }
    if (!lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    }
    if (Object.keys(errors).length > 0) {
      return res
        .status(400)
        .json({ message: "All fields are required", errors });
    }
    const user = await UserSchema.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserSchema.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const userId = newUser._id;
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  const error = {};
  try {
    const { email, password } = req.body;
    if (!email) {
      error.email = "Email is required";
    }
    if (!password) {
      error.password = "Password is required";
    }
    if (Object.keys(error).length > 0) {
      return res
        .status(400)
        .json({ message: "All fields are required", error });
    }
    const user = await UserSchema.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid password" });
    }
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const userId = user._id;
    res.cookie(
      "token",
      token,
      { httpOnly: true },
      (maxAge = 24 * 60 * 60 * 1000)
    );
    res.status(200).json({ message: "Login successful", userId });
  } catch (error) {
    next(error);
  }
};
module.exports = { register, login };
