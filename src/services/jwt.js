const jwt = require("jsonwebtoken");

module.exports = {
  sign: (userBody) =>
    jwt.sign({ sub: userBody }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    }),
  verify: (authorization) => {
    const [_, token] = authorization.split(" ");
    const verifyUser = jwt.verify(token, process.env.JWT_SECRET);

    return verifyUser;
  },
  logout: (userBody) =>
    jwt.sign({ sub: userBody }, process.env.JWT_SECRET, {
      expiresIn: 1,
    }),
};

//  res.send({ msg: "You have been Logged Out" });
