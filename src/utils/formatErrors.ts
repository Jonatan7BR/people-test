import { Result, ValidationError } from "express-validator";

interface Message {
    message: string[];
}

export function formatErrors(errors: Result<ValidationError>): Message {
    return { message: errors.array().map(e => `${e.param} - ${e.msg}`).sort() };
}
