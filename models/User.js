const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");
const saltRound = 12;

const UserSchema = new Schema({
  name: {
    type: String,
  },

  surname: {
    type: String,
  },

  username: {
    type: String,
    unique: true,
    require: true,
  },

  email: {
    type: String,
    unique: true,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', function (next) {
  const user = this;
   bcrypt.hash(user.password, saltRound, (error, hash) => {
    user.password = hash;
    next();
  });
  
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
