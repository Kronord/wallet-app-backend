const { User } = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async ({ username, email, password }) => {
  const doubleEmail = await User.findOne({ email });

  if (doubleEmail) {
    return null;
  }

  const user = new User({
    username,
    email,
    password,
  });

  await user.save();

  return { username, email, message: "Registration successfull" };
};

const loginUser = async ({email, password}) => {
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null;
  }

  const payload = {
    _id: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  return token;
};

const logout = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });
};

const authenticateUser = async (token) => {
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    const { _id } = payload;
    const user = await User.findById(_id);

    return user.token !== token ? null : user;
  } catch (e) {
    return null;
  }
};

module.exports = { registerUser, loginUser, logout, authenticateUser };
