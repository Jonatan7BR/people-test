import { PersonController } from "../../controllers/person.controller";
import { Person } from "../../models/person.model";

describe('Testing Person controller', () => {
    const id = 1;
    const personReq = {
        firstName: 'Taro',
        lastName: 'Tanaka',
        age: 30,
        identifier: '12345678901',
        email: 'tata@dom.co.jp'
    };
    const personRes = {
        ...personReq,
        id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should init the controller', () => {
        const controller = new PersonController();
        expect(controller).toBeTruthy();
    });

    it('should return all people', async () => {
        const person = Person;
        person.findAll = jest.fn().mockReturnValue([personRes]);
        const controller = new PersonController(person);

        const result = await controller.getAllPeople();
        expect(result).toHaveLength(1);
        expect(result).toContain(personRes);
    });

    it('should return one person', async () => {
        const person = Person;
        person.findByPk = jest.fn().mockReturnValue(personRes);
        const controller = new PersonController(person);

        const result = await controller.getPerson(id);
        expect(result).toBe(personRes);
    });

    it('should register a person', async () => {
        const person = Person;
        person.create = jest.fn().mockReturnValue(personRes);
        const controller = new PersonController(person);

        const result = await controller.createPerson(personReq);
        expect(result).toBe(personRes);
    });

    it('should update a person', async () => {
        const person = Person;
        const personObject = new Person(personRes);

        person.findByPk = jest.fn().mockReturnValue(personObject);
        personObject.update = jest.fn().mockReturnValue(personRes);
        const controller = new PersonController(person);

        const result = await controller.updatePerson(id, personReq);
        expect(result).toBe(personRes);
    });

    it('should not update if no person found', async () => {
        const person = Person;
        person.findByPk = jest.fn().mockReturnValue(null);
        const controller = new PersonController(person);

        const result = await controller.updatePerson(id, personReq);
        expect(result).toBeNull();
    });

    it('should remove a person', async () => {
        const person = Person;
        const personObject = new Person(personRes);

        person.findByPk = jest.fn().mockReturnValue(personObject);
        personObject.destroy = jest.fn();
        const controller = new PersonController(person);

        const result = await controller.deletePerson(id);
        expect(result).toBeTruthy();
    });

    it('should not remove if no person found', async () => {
        const person = Person;
        person.findByPk = jest.fn().mockReturnValue(null);
        const controller = new PersonController(person);

        const result = await controller.deletePerson(id);
        expect(result).toBeFalsy();
    });
});
