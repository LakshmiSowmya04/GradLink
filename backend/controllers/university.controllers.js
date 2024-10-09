import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../lib/res/index.js";
import University from "../models/university.js";

async function CreateUniversity(req, res) {
    const { name, establishedOn, description, website } = req.body;
    const user = req.user;
    try {
        const universityFound = await University.find({
            $or: [{name}, {website}]
        });
        if (universityFound) {
            return res
                .status(StatusCodes.CONFLICT)
                .json(
                    errorResponse("University Exists.", StatusCodes.CONFLICT),
                )
        }
        const university = await University.create({
            name,
            establishedOn,
            description,
            website,
            admin: user
        });
        const newUniversity = await University.findById(university._id);
        return res
            .status(StatusCodes.CREATED)
            .json(
                successResponse("University Created", newUniversity, StatusCodes.ACCEPTED),
            )
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(errorResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

export { CreateUniversity };