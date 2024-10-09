import { z } from "zod";

const createUniversity = z.object({
    name: z
        .string()
        .min(5, { message: "Name Should Be Greater Than 5 Characters." }),
    establishedOn: z
        .string()
        .min(1, "Invalid Date."),
    description: z
        .string()
        .min(10, { message: "Description Should Be Greater Than 10 Characters." }),
    website: z
        .string()
        .url()
        .refine((url) => {
            return (url.endsWith('.ac.in') || url.endsWith('.edu.in')) && !url.includes('.com');
        }, {
            message: "Invalid Website Format. Should End With .edu.in or .ac.in",
        }),
});

export {
    createUniversity,
};