const registerUser = async (req, res, next) => {
  res.send("register user");
};

const loginUser = async (req, res, next) => {
  res.send("login user");
};

export { registerUser, loginUser };
