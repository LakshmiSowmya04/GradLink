import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  college: { type: mongoose.Schema.Types.ObjectId, ref: "University" },
  role: { type: String, enum: ["student", "alumni"], required: true },
  bio: { type: String },
  graduationYear: { type: Number },
  profession: { type: String },
  company: { type: String },
  profilePicture: { type: String },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  otpCode: { type: String }, // otp code for email verification
  otpExpiry: { type: Date }, // expiry time for otp
  isVerified: { type: Boolean, default: false }, // email is verified or not
  createdAt: { type: Date, default: Date.now }, //timestamp of user creation
  updatedAt: { type: Date, default: Date.now }, // timestamp of the lastest update
});

// middleware for updating updated at whenever there is an update in userschema
UserSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the User model
const User = mongoose.model("User", UserSchema);
export default User;
