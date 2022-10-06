import cors from 'cors'
import express, {Request, Response} from 'express'
import { config } from 'dotenv';

import { ErrorsInterceptor } from './middlewares/errors.interceptor';
import { UnknownRoutesInterceptor } from './middlewares/unknownRoutes.interceptor';
import { dbConnection } from "./connexion";
import { LeagueController } from "./apis/leagues.api";
import { TeamsController } from "./apis/teams.api";

config();

const app = express();

/**
 * Parse body request to JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express.json());

/**
 *
 * We tell Express that we want to authorize all domain names to make requests on our API.
 */
app.use(cors());

/**
 * All CRUD routes for teams will be prefixed with `/teams`
 */
app.use('/teams', TeamsController);

/**
 * All CRUD routes for leagues will be prefixed with `/leagues`
 */
app.use('/leagues', LeagueController);
app.use('/league', LeagueController);

/**
 * Attach error handling middleware functions after route handlers
 */
app.use(ErrorsInterceptor);

/**
 * Check NODE ENV
 */
const API_PORT = process.env.NODE_ENV === 'test' ? 3001 : (process.env.API_PORT || 3000);

/**
 * Listen for requests on the port defined in the config
 */
app.listen(API_PORT, async () => {
    console.log(`Server is listening on port ${API_PORT}`);
    await dbConnection();
});
