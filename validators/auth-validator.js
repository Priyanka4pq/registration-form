const { z } = require("zod")

const signupSchema = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "number must be at least of 3 chars." })
        .max(255, { message: "name must be 255 characters" }),
    email: z
        .string({ required_error: "Name is required" })
        .trim()
        .email({ message: "email is not valid" })
        .min(3, { message: "number must be at least of 3 chars." })
        .max(255, { message: "name must be 255 characters" }),
    password: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "number must be at least of 3 chars." })
        .max(255, { message: "name must be 255 characters" }),
    number: z
        .string({ required_error: "number is required" })
        .trim()
        .min(10, { message: "number must be at least of 10 chars." })
        .max(20, { message: "name must be 10 characters" }),
})

module.exports = signupSchema;