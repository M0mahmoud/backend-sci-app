import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    plants: [
      {
        type: Schema.Types.ObjectId,
        ref: "Plant",
      },
    ],
  },
  { timestamps: true }
);

const User = model("User", UserSchema);
export default User;
