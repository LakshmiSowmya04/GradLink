import { z } from "zod";
import { errorResponse, successResponse } from "../lib/res/index.js";
import { StatusCodes } from "http-status-codes";

const validateSchema = (schema, source="body") => {
    function validate(req, res, next) {
        try {
            schema.parse(req[source]);
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
    return validate;
}

export default validateSchema;