import { PersonController } from "../../src/controllers/person.controller";
import { Person } from "../../src/models/person.model";

describe('Testing Person controller', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return all people', async () => {
        const person = Person;
        person.findAll = jest.fn().mockReturnValue([]);
        const controller = new PersonController(person);

        const result = await controller.getAllPeople();
        expect(result).toHaveLength(0);
    });

    it('should return one person', async () => {
        const id = 1;
        const personData = {
            id,
            firstName: 'Taro',
            lastName: 'Tanaka',
            age: 30,
            identifier: '12345678901',
            email: 'tata@dom.co.jp',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        const person = Person;
        person.findOne = jest.fn().mockReturnValue(personData);
        const controller = new PersonController(person);

        const result = await controller.getPerson(id);
        expect(result).toBe(personData);
    });
});
