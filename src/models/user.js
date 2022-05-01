const path = require("path");
const { readJSONAsync, writeJSONAsync } = require("../utils/jsonHelpers");

const dbUsersJsonPath = path.resolve(
  process.cwd(),
  "src/services/db_users.json"
);

exports.addNewUser = async (user) => {
  const dbUsers = await readJSONAsync(dbUsersJsonPath);
  const foundUser = dbUsers.users.find(
    (existingUser) => user.login === existingUser?.login
  );
  if (foundUser) {
    return false;
  }

  dbUsers.users.push(user);
  await writeJSONAsync(dbUsersJsonPath, dbUsers);

  return true;
};

exports.fetchUserByLogin = async (login) => {
  const dbUsers = await readJSONAsync(dbUsersJsonPath);

  return dbUsers.users.find((user) => user.login === login);
};
