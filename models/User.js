const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
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

  role : {
    type : String,
    enum: ["student", "teacher", "admin"],
    default : "student"
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  courses : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Course'
  }]
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
