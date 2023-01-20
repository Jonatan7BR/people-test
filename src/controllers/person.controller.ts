import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { sequelize } from "../config/sequelize";
import { Person, personMap } from "../models/person.model";
import { formatErrors } from "../utils/formatErrors";

export class PersonController {
    
    static async getAllPeople(_: Request, res: Response): Promise<void> {
        await personMap(sequelize);
        const result = await Person.findAll();
        res.status(200).send(result);
    }

    static async getPerson(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            res.status(400).send({ message: 'ID inválido' });
            return;
        }
        await personMap(sequelize);
        const id = +req.params.id;
        const result = await Person.findByPk(id);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: `Não foi encontrada pessoa com ID ${id}` });
        }
    }

    static async createPerson(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).send(formatErrors(errors));
            return;
        }
        await personMap(sequelize);
        const result = await Person.create(req.body);
        if (result) {
            res.status(201).send(result);
        } else {
            res.status(500).send({ message: 'Não foi possível cadastrar a pessoa' });
        }
    }

    static async updatePerson(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).send(formatErrors(errors));
        }
        await personMap(sequelize);
        const id = +req.params.id;
        const person = await Person.findByPk(id);
        if (!person) {
            res.status(404).send({ message: `Não foi encontrada pessoa com ID ${id}` });
            return;
        }
        const result = await person.update(req.body);
        if (result) {
            res.status(201).send(result);
        } else {
            res.status(500).send({ message: 'Não foi possível atualizar a pessoa' });
        }
    }
}
