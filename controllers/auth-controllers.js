const Student = require("../models/Student.js");
const bcrypt = require("bcrypt");
console.log("Came inside auth-controller");

const home = async (req, res) => {
  try {
    res.send("<h1>this is home page</h1>");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password, number } = req.body;

    const userExit = await Student.findOne({ email: email });

    if (userExit) {
      return res.status(400).json({ msg: "user already exit" });
    }

    const userCreated = await Student.create({
      name,
      email,
      password,
      number,
    });
    res.status(200).json({
      msg: "registration successful",
      user: userCreated,
      token: await userCreated.tokens(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    // console.log(error)
    // res.status(500).json("internal  error")

    const status = 500;
    const message = "registration failed";
    const extraDetails = error;

    const err = {
      status,
      message,
      extraDetails,
    };

    next(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExit = await Student.findOne({ email });

    if (!userExit) {
      return res.status(400).json({ msg: "invalid data" });
    }

    // const user = await bcrypt.compare(password, userExit.password);

    const user = await userExit.comparePassword(password);
    if (user) {
      res.status(200).json({
        msg: "registration successful",
        token: await userExit.tokens(),
        userId: userExit._id.toString(),
        user: userExit,
      });
    } else {
      res.status(401).send("invalid user");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { home, register, login };
