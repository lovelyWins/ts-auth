import mongoose from "mongoose";
import validator from "validator";
const bcrypt = require("bcrypt");

export interface User {
  name: string;
  phone: number;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    validate(value: number) {
      if (!(value.toString().length === 10)) {
        throw new Error("invalid phone !!");
      }
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid email !!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value: string) {
      if (value.length < 8) {
        throw new Error("password should contain atleast 8 characters");
      }
    },
  },

});

// creating function to check for if email/password is correct
export const findByCredentials = async (email: string, password: string) => {
  // finding if email provided is
  const user = await Users.findOne({ email });
  // if user doesn't exists
  if (!user) {
    throw new Error("Enter valid email");
  }

  // comparing passwords
  const isCorrectPass = await bcrypt.compare(password, user.password);

  if (!isCorrectPass) {
    throw new Error("Enter valid Password");
  }

  return user;
};

export const Users = mongoose.model<User>("Users", userSchema);
