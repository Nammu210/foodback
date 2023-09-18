const user = require("../modelSchema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRound = process.env.SALTROUND;

const SigninUser = async (req, res) => {
  const regData = req.body;
  const { email, password, userId } = regData;
  const userData = await user.findOne({ email: email });

  if (userData) {
    return res.send({ msg: "user is already Signin" });
  } else {
    const salt = bcrypt.genSaltSync(saltRound);
    const hashedpassword = bcrypt.hashSync(password, salt);
    const token = await jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15d",
    });

    const tempObj = await user({
      email: email,
      password: hashedpassword,
    });

    const result = await tempObj.save();
    return res.send({
      msg: "user Signin successfully",
      token: token,
      email: email,
      userId: result._id,
      result: result,
    });
  }
};

const loginUser = async (req, res) => {
  const logData = req.body;
  const { email, password } = logData;
  const userData = await user.findOne({ email: email });
  if (userData) {
    const hashedPassword = userData.password;
    const salt = bcrypt.genSaltSync(saltRound);
    const validate = bcrypt.compareSync(password, hashedPassword);
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15d",
    });
    if (validate) {
      return res.send({
        msg: "user login successfully",
        token: token,
        userData: userData,
      });
    } else {
      return res.send({
        msg: "invalid credential",
      });
    }
  }
  if (!userData) {
    return res.send({
      msg: "user not Signined please Signin first",
    });
  }
};

module.exports = { SigninUser, loginUser };
