import { Result, ValidationError } from "express-validator";

interface Message {
    message: string[];
}

export const formatErrors = (errors: Result<ValidationError>): Message => ({ 
    message: errors.array().map(e => `${e.param} - ${e.msg}`).sort() 
});
