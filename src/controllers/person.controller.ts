import { Request, Response } from "express";
import { sequelize } from "../config/sequelize";
import { Person, personMap } from "../models/person.model";

export class PersonController {
    
    static async getAllPeople(_: Request, res: Response): Promise<void> {
        await personMap(sequelize);
        const result = await Person.findAll();
        res.status(200).send(result);
    }

    static async getPerson(req: Request, res: Response): Promise<void> {
        await personMap(sequelize);
        const id = +req.params.id;
        if (isNaN(id)) {
            res.status(400).send({ message: 'ID inválido' });
            return;
        }
        const result = await Person.findByPk(id);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: `Não foi encontrada pessoa com ID ${id}` });
        }
    }
}