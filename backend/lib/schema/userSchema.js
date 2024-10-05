import { z } from "zod";

const userSchema = z.object({
    username: z.string(),
    email: z.string().email({ message: "Invalid Email Format."}),
    password: z.string().min(6, { message: "Password Should Be Minimum Of 6 Characters." }),
    college: z.string(),
    role: z.enum(["student", "alumni"]).refine(
        (role) => role === "student" || role === "alumni",
        { message: "Invalid Role. Role should be either 'student' or 'alumini'." }
    )
});

export {
    userSchema
};