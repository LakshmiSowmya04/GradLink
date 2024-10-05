import { z } from "zod";

const signUpSchema = z.object({
    username: z
        .string(),
    email: z
        .string()
        .email({ message: "Invalid Email Format."}),
    password: z
        .string()
        .min(6, { message: "Password Should Be Minimum Of 6 Characters." })
        .max(25, { message: "Password Should Be Maximum Of 25 Characters."}),
    // college: z
        // .string(),
    role: z.enum(["student", "alumni"]).refine(
        (role) => role === "student" || role === "alumni",
        { message: "Invalid Role. Role should be either 'student' or 'alumini'." }
    )
});

const logInSchema = z.object({
    username: z
        .string(),
    password: z
        .string()
        .min(6, { message: "Password Should Be Minimum Of 6 Characters." })
        .max(25, { message: "Password Should Be Maximum Of 25 Characters." }),
});

export {
    signUpSchema,
    logInSchema
};