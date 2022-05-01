const { v4: uuid } = require("uuid");
const userModel = require("../models/user");
const { parseJsonBody } = require("../utils/jsonHelpers");
const { createPasswordHash } = require("../utils/encription");
const { HttpError } = require("../utils/custom-errors");
const jwt = require("../services/jwt");

exports.createUser = async (req, res) => {
  const { password, ...user } = await parseJsonBody(req);
  user.id = uuid();

  if (!user.login || !password) {
    throw new HttpError();
  }

  const passwordHash = await createPasswordHash(password);
  const createUserResult = await userModel.addNewUser({
    ...user,
    password: passwordHash,
  });

  console.log("createUserResult", createUserResult);
  if (createUserResult) {
    return user;
  } else {
    throw new HttpError();
  }
};

exports.signInUser = async (req, res) => {
  const userData = await parseJsonBody(req);
  if (!userData || !userData.login || !userData.password) {
    throw new HttpError();
  }

  const { password, ...userBody } = await userModel.fetchUserByLogin(
    userData.login
  );
  if (!userBody) {
    throw new HttpError();
  }

  const currentPasswordHash = await createPasswordHash(userData.password);
  if (password !== currentPasswordHash) {
    throw new HttpError();
  }

  return { token: jwt.sign(userBody) };
};

exports.logoutUser = async (req, res) => {
  const userData = await parseJsonBody(req);
  if (!userData || !userData.login) {
    throw new HttpError();
  }

  const { password, ...userBody } = await userModel.fetchUserByLogin(
    userData.login
  );
  if (!userBody) {
    throw new HttpError();
  }

  if (userData.login !== userBody.login) {
    throw new HttpError();
  }

  return { token: jwt.logout(userBody) };
};
