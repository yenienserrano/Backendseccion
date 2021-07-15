const { Schema, model } = require("mongoose");
const { compareSync, genSaltSync, hashSync } = require("bcryptjs");

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.method.toJSON = function () {
  let user = this.toObject();
  delete user.password;
  return user;
};

UserSchema.method.comparePassword = function (password) {
  return compareSync(password, this.password);
};

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    next();
  }

  const salt = genSaltSync(10);
  const hashedPassword = hashSync(user.password, salt);
  user.password = hashedPassword;
  next();
});

module.exports = model("user", UserSchema);
