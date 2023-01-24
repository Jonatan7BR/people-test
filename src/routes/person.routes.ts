import { Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import { PersonController } from "../controllers/person.controller";
import { formatErrors } from "../utils/formatErrors";
import { idValidator } from "../validators";
import { personValidator } from "../validators/person.validator";

export const personRoutes = Router();
const controller = new PersonController();

personRoutes
    .get('/pessoas', async (_: Request, res: Response) => {
        const result = await controller.getAllPeople();
        res.status(200).send(result);
    })

    .get('/pessoas/:id', idValidator, async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ message: 'ID inválido' });
            return;
        }
        const { id } = req.params;
        const result = await controller.getPerson(+id);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: `Não foi encontrada pessoa com ID ${id}` });
        }
    })

    .post('/pessoas', personValidator, async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).send(formatErrors(errors));
            return;
        }
        const result = await controller.createPerson(req.body);
        res.status(201).send(result);
    })

    .put('/pessoas/:id', idValidator, personValidator, async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).send(formatErrors(errors));
            return;
        }
        const { id } = req.params;
        const result = await controller.updatePerson(+id, req.body);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: `Não foi encontrada pessoa com ID ${id}` });
        }
    })

    .delete('/pessoas/:id', idValidator, async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ message: 'ID inválido' });
            return;
        }
        const { id } = req.params;
        const result = await controller.deletePerson(+id);
        if (result) {
            res.status(200).send({ message: 'Pessoa excluída com sucesso' });
        } else {
            res.status(404).send({ message: `Não foi encontrada pessoa com ID ${id}` });
        }
    });
