const userService = require("../user/user.service");
const bcrypt = require("bcrypt");

async function login(username, password) {
  const user = await userService.getByUsername(username);
  if (!user) return Promise.reject("no such user");
  const match = await bcrypt.compare(password, user.password);
  if (!match) return Promise.reject("wrong password");
  delete user.password;
  return user;
}

async function signUp(user) {
  // console.log('password', await bcrypt.hash("mia", 10))
  try {
    const saltRounds = 10;
    const exsitUser = await userService.getByUsername(user.username);
    if (exsitUser) {
      console.log("username taken", exsitUser);
      return Promise.reject("username taken");
    }
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;
    user.reviews = [];
    const addedUser = await userService.add(user);
    delete addedUser.password;
    return addedUser;
  } catch (err) {
    console.log("error while signing up: ", err);
    throw err;
  }
}
module.exports = {
  login,
  signUp,
};
