import { z } from "zod";
import { userSchema } from "../lib/schema/userSchema.js";
import { errorResponse, successResponse } from "../lib/res/index.js";
import { StatusCodes } from "http-status-codes";

const validateUser = (req, res, next) => {
    try {
        const validateData = userSchema.parse(req.body);
        req.body = validateData;
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            const zError = error.format();
            return res
                .status(StatusCodes.FORBIDDEN)
                .json(new errorResponse(
                    "Validation Error", { zError }, StatusCodes.FORBIDDEN,
                ));
        }
    }
}

export default validateUser;