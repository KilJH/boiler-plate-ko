const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

/*
//저장하기 전에 next라는
userSchema.pre("save", (next) => {
  const user = this;

  console.log("hashing...");


  //비밀번호가 변경될 때에만
  if (user.isModified("password")) {
    //비밀번호 암호화
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        console.log(user.password);
        next();
      });
    });
  }
});*/

//under ES6
userSchema.pre("save", function (next) {
  const user = this;
  console.log("Encrypt...");

  //비밀번호가 변경될 때에만
  if (user.isModified("password")) {
    //비밀번호 암호화
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        console.log(user.password);
        next();
      });
    });
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
