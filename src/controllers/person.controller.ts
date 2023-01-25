import { sequelize } from "../config/sequelize";
import { Person, personMap } from "../models/person.model";

export class PersonController {

    constructor(
        private readonly orm = sequelize,
        private readonly person = Person,
        private readonly map = personMap
    ) {}
    
    getAllPeople = async (): Promise<Person[]> => {
        await this.map(this.orm);
        return await this.person.findAll();
    };

    getPerson = async (id: number): Promise<Person | null> => {
        await personMap(sequelize);
        return await Person.findByPk(id);
    };

    createPerson = async (body: any): Promise<Person> => {
        await personMap(sequelize);
        return await Person.create(body);
    };

    updatePerson = async (id: number, body: any): Promise<Person | null> => {
        await personMap(sequelize);
        const person = await Person.findByPk(id);
        if (!person) {
            return null;
        }
        return await person.update(body);
    };

    deletePerson = async (id: number): Promise<boolean> => {
        await personMap(sequelize);
        const person = await Person.findByPk(id);
        if (!person) {
            return false;
        }
        await person.destroy();
        return true;
    };
}
