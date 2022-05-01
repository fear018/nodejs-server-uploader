const { HttpError } = require("../utils/custom-errors");
const jwt = require("../services/jwt");

exports.checkAuth = (req) => {
  console.log("checkAuth");
  console.log("req.headers", req.headers);
  const { authorization } = req.headers;
  console.log(req.headers);
  if (!authorization) {
    throw new HttpError("Unauthorized.", 401);
  }
  try {
    const [_, token] = authorization.split(" ");
    const verifyUser = jwt.verify(token);
    req.user = verifyUser;
  } catch (err) {
    throw new HttpError("Forbidden.", 403);
  }
};
