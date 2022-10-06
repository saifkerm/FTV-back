import cors from 'cors';
import express from 'express';
import { config } from 'dotenv';

import { ErrorsInterceptor } from './middlewares/errors.interceptor';
import { dbConnection } from './connexion';
import { TopicController } from './apis/topic.api';
import { UnknownRoutesInterceptor } from './middlewares/unknownRoutes.interceptor';

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
 * All CRUD routes for news will be prefixed with `/topics`
 */
app.use('/topics', TopicController);

/**
 * Intercept and return error 404 for unknown routes
 */
app.use('*', UnknownRoutesInterceptor);

/**
 * Attach error handling middleware functions after route handlers
 */
app.use(ErrorsInterceptor);

/**
 * Check NODE ENV
 */
const API_PORT =
  process.env.NODE_ENV === 'test' ? 3001 : process.env.API_PORT || 3000;

console.log('API_PORT', API_PORT);
/**
 * Listen for requests on the port defined in the config
 */
app.listen(API_PORT, async () => {
  console.log(`Server is listening on port ${API_PORT}`);
  await dbConnection();
});
