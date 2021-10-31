const User = require("../model/user");

// TODO: user to address
async function userTodoAddress(userid) {
  if (userid.startsWith("0x")) {
    return userid;
  }
  var user = await User.findOne({ name: userid });
  if (user == null) return "";

  return user.address;
}

module.exports = {
  userTodoAddress: userTodoAddress,
};
