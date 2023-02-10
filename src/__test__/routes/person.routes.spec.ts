import express from 'express';
import request from 'supertest';
import { sequelize } from '../../config/sequelize';
import { Person, personMap } from '../../models/person.model';
import { routes } from '../../routes';
import { controller } from '../../routes/person.routes';

describe('Person routes', () => {
    const app = express();
    routes(app);
    personMap(sequelize);

    const id = 1;
    const personData = {
        firstName: 'Taro',
        lastName: 'Tanaka',
        age: 30,
        identifier: '12345678901',
        email: 'tata@dom.co.jp'
    };
    const personReq = new Person(personData);
    const personRes = new Person({
        ...personData,
        id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should test GET /pessoas and return success', () => {
        controller.getAllPeople = jest.fn().mockResolvedValue([personRes]);

        request(app).get('/pessoas').expect(200);
    });

    it('should test GET /pessoas/:id and return a person', () => {
        controller.getPerson = jest.fn().mockResolvedValue(personRes);

        request(app).get('/pessoas/1').expect(200).then(resolved => {
            const { body } = resolved;
            console.log(body);
            expect(body).toHaveProperty('id', 1);
            expect(body).toHaveProperty('firstName', personData.firstName);
        });
    });
});
