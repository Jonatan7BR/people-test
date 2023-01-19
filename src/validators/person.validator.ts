import { body } from "express-validator";
import { validateCpf } from "../utils/validateCpf";

export const personValidator = [
    body(
        ['firstName', 'lastName', 'gender', 'identifier', 'email'], 
        'Campo obrigatório'
    ).exists({ checkFalsy: true }),

    body('age', 'Campo obrigatório').exists(),

    body(
        ['firstName', 'lastName'],
        'Formato inválido - Deve ser texto'
    ).isString(),

    body(
        'age',
        'Formato inválido - Deve ser um número natural'
    ).isInt({ min: 0 }),

    body(
        'gender',
        'Formato inválido - Deve ser M, F ou O'
    ).isIn(['M', 'F', 'O']),

    body('identifier', 'CPF inválido').custom(validateCpf),

    body('email', 'E-mail inválido').isEmail()
];
