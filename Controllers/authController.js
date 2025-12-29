const { errorOrResponce, unauthorizedError } = require("../error");
const { registerUser, loginUser, logout } = require("../Services/authService");

const registrationController = async (req, res, next) => {
  try {
    const userData = await registerUser(req.body);
    if (userData === null) {
      return res.status(409).json(
        errorOrResponce("409 Conflict", {
          message: "Email in use",
        })
      );
    }
    res.status(201).json(
      errorOrResponce("201 Created", {
        user: userData,
      })
    );
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = await loginUser(req.body);
    if (token === null) {
      return res.status(401).json(
        unauthorizedError("401 Unauthorized", {
          message: "Email or password is wrong",
        })
      );
    }
    res.status(200).json(
      errorOrResponce("200 OK", {
        token,
        user: {
          email,
        },
      })
    );
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  try {
    await logout(req.user._id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
};
