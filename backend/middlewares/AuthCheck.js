import { JWT_SECRET } from "../config/index.js";
import jwt from "jsonwebtoken";
import { errorResponse, successResponse } from "../lib/res/index.js";
import { StatusCodes } from "http-status-codes";
const authCheck = (req, res, next) => {
  try {
    // retrieve the token directly from the request's cookies
    const token = req.cookies.auth_session;

    // check if token exists
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(
          errorResponse(
            "Access Denied: No token provided",
            StatusCodes.UNAUTHORIZED
          )
        );
    }

    // Verify the token and extract payload

    const decoded = jwt.verify(token, JWT_SECRET);

    // attach the user's id to the request object
    req.user = decoded.id;

    // If verification is successful, call next() to proceed to the route handler
    next();
  } catch (error) {
    // Handle token verification errors (e.g., invalid token, token expired)
    return res
      .status(StatusCodes.FORBIDDEN)
      .json(errorResponse("Invalid or expired token", StatusCodes.FORBIDDEN));
  }
};

export default authCheck;
