const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    email_verified_at: {
      type: Date,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
    remember_token: {
      type: String,
    },
  },
  schemaOptions
);
module.exports = mongoose.model("User", userSchema);
