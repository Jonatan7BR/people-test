import bodyParser from 'body-parser';
import { Express } from 'express';
import { personRoutes } from './person.routes';

export function routes(app: Express): void {
    app.use(
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        personRoutes
    );
};
