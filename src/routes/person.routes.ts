import { Router } from "express";
import { PersonController } from "../controllers/person.controller";
import { idValidator } from "../validators";
import { personValidator } from "../validators/person.validator";

export const personRoutes = Router();

personRoutes
    .get('/pessoas', PersonController.getAllPeople)
    .get('/pessoas/:id', idValidator, PersonController.getPerson)
    .post('/pessoas', personValidator, PersonController.createPerson)
