const User = require("../model/user");

// TODO: user to address
async function userToAddress(userid) {
  if (userid.startsWith("0x")) {
    return userid;
  }
  var user = await User.findOne({ name: userid });
  if (user == null) return "";

  return user.address;
}

// TODO: address to user
async function addressToUser(useraddress) {
  if (!useraddress.startsWith("0x")) {
    return useraddress;
  }
  var user = await User.findOne({ address: useraddress });
  if (user == null) return "";

  return user.name;
}

module.exports = {
  userToAddress: userToAddress,
  addressToUser: addressToUser,
};
