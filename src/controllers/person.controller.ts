import { sequelize } from "../config/sequelize";
import { Person, personMap } from "../models/person.model";

export class PersonController {

    constructor(
        private readonly person = Person,
        private readonly orm = sequelize,
        private readonly map = personMap
    ) {}
    
    getAllPeople = async (): Promise<Person[]> => {
        await this.map(this.orm);
        return await this.person.findAll();
    };

    getPerson = async (id: number): Promise<Person | null> => {
        await this.map(this.orm);
        return await this.person.findByPk(id);
    };

    createPerson = async (body: any): Promise<Person> => {
        await this.map(this.orm);
        return await this.person.create(body);
    };

    updatePerson = async (id: number, body: any): Promise<Person | null> => {
        await this.map(this.orm);
        const person = await this.person.findByPk(id);
        if (!person) {
            return null;
        }
        return await person.update(body);
    };

    deletePerson = async (id: number): Promise<boolean> => {
        await this.map(this.orm);
        const person = await this.person.findByPk(id);
        if (!person) {
            return false;
        }
        await person.destroy();
        return true;
    };
}
