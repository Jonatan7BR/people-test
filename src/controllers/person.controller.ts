import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { sequelize } from "../config/sequelize";
import { Person, personMap } from "../models/person.model";
import { formatErrors } from "../utils/formatErrors";

export class PersonController {
    
    async getAllPeople(): Promise<Person[]> {
        await personMap(sequelize);
        return await Person.findAll();
    }

    async getPerson(id: number): Promise<Person | null> {
        await personMap(sequelize);
        return await Person.findByPk(id);
    }

    async createPerson(body: any): Promise<Person> {
        await personMap(sequelize);
        return await Person.create(body);
    }

    async updatePerson(id: number, body: any): Promise<Person | null> {
        await personMap(sequelize);
        const person = await Person.findByPk(id);
        if (!person) {
            return null;
        }
        return await person.update(body);
    }

    async deletePerson(id: number): Promise<boolean> {
        await personMap(sequelize);
        const person = await Person.findByPk(id);
        if (!person) {
            return false;
        }
        await person.destroy();
        return true;
    }
}
