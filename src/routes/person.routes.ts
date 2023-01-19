import { Router } from "express";
import { PersonController } from "../controllers/person.controller";

export const personRoutes = Router();

personRoutes
    .get('/pessoas', PersonController.getAllPeople)
    .get('/pessoas/:id', PersonController.getPerson)