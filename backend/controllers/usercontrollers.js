import StatusCodes from "http-status-codes";
import { errorResponse, successResponse } from "../lib/res/index.js";
import { hash, compare } from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
import { cookieOptions } from "../lib/constant/index.js";
import { welcomeEmail, sendVerificationEmail } from "../helper/emailhelper.js";
//post request
async function SignupUser(req, res) {
  const { username, email, password, college, role } = req.body;
  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          errorResponse("User account already exists", StatusCodes.BAD_REQUEST)
        );
    }
    //Hashing the password here
    const hashedPassword = await hash(password, 10);

    //creating new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      college,
      role,
    });
    //saving user in database
    const newUser = await user.save();

    //creating token by jwt
    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    //sending cookie for response
    res.cookie("auth_session", token, cookieOptions);

    //returning success response
    sendVerificationEmailService(req, res, newUser._id);
    return res
      .status(StatusCodes.ACCEPTED)
      .json(
        successResponse("User created successfully", {}, StatusCodes.ACCEPTED)
      );
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

//post request
async function LoginUser(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    // If no user found, return an error response
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(errorResponse("User not found", StatusCodes.NOT_FOUND));
    }
    const email = user.email;
    const name = user.username;
    console.log(email, name);

    // Compare password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(errorResponse("Invalid credentials", StatusCodes.BAD_REQUEST));
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set cookie with token
    res.cookie("auth_session", token, cookieOptions);

    // Send welcome email
    welcomeEmail(email, name);

    // Return success response
    return res
      .status(StatusCodes.ACCEPTED)
      .json(successResponse("Login successful", {}, StatusCodes.ACCEPTED));
  } catch (error) {
    // Fix typo: change 'INTERNAL_SERVER_ERRORT' to 'INTERNAL_SERVER_ERROR'
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

//use authcheck middleware for using this controller
//get request
async function getUser(req, res) {
  try {
    const id = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(errorResponse("User not found", StatusCodes.NOT_FOUND));
    }
    return res
      .status(StatusCodes.OK)
      .json(
        successResponse("Successfully get user info", user, StatusCodes.OK)
      );
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}
async function followUser(req, res) {
  const { userId } = req.params;
  const { currentUserId } = req.body;

  try {
    const user = await User.findById(currentUserId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(errorResponse("Current user not found", StatusCodes.NOT_FOUND));
    }

    // Check if the user is already following the target user
    if (!user.following.includes(userId)) {
      user.following.push(userId);
      await user.save();
    }

    return res
      .status(StatusCodes.OK)
      .json(successResponse("User followed successfully", {}, StatusCodes.OK));
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(err.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

//use authcheck middleware to obtain value for req.user
async function verifyEmail(req, res) {
  const { verification_token } = req.body;
  const id = req.user;

  try {
    // Find the user with the given ID
    const user = await User.findById(id);

    // Check if the user exists
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(errorResponse("User not found", StatusCodes.NOT_FOUND));
    }

    // checking if user is already verified
    if (user.isVerified) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(errorResponse("User already verified", StatusCodes.BAD_REQUEST));
    }

    // checking the validity of otp
    if (user.otpCode !== verification_token) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          errorResponse(
            "Invalid or expired verification token",
            StatusCodes.BAD_REQUEST
          )
        );
    }

    const now = new Date();
    if (now > user.otpExpiry) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          errorResponse(
            "Verification token has expired",
            StatusCodes.BAD_REQUEST
          )
        );
    }

    //update to verified
    user.isVerified = true;
    user.otpCode = null;
    user.otpExpiry = null;
    await user.save();

    return res
      .status(StatusCodes.OK)
      .json(successResponse("Email verified successfully", {}, StatusCodes.OK));
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

export { SignupUser, LoginUser, getUser, followUser, verifyEmail };

// services are writen here which do not perform http requests rather help
async function sendVerificationEmailService(req, res, _id) {
  try {
    const userCheck = await User.findById(_id);
    if (!userCheck) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(errorResponse("User not found", StatusCodes.BAD_REQUEST));
    }
    if (userCheck.isVerified) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("User already verified", StatusCodes.BAD_REQUEST);
    }
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { otpCode: verificationToken, otpExpiry: expiresAt },
      { new: true }
    );
    //preparing to send otp to email
    const { email } = updatedUser;
    sendVerificationEmail(email, verificationToken);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

async function deleteUnverifiedUsers() {
  const expirationTime = 24 * 60 * 60 * 1000; // 1 day
  const now = new Date();

  try {
    //finding all the users which are not verfied
    const expiredUsers = await User.find({
      isVerified: false,
      createdAt: { $lt: new Date(now.getTime() - expirationTime) },
    });

    // Delete inverified users
    if (expiredUsers.length > 0) {
      await User.deleteMany({
        _id: { $in: expiredUsers.map((user) => user._id) },
      });
      console.log(`Deleted ${expiredUsers.length} unverified users.`);
    }
  } catch (error) {
    console.error(`Error deleting unverified users: ${error.message}`);
  }
}
export { deleteUnverifiedUsers };
