import request, { Response } from 'supertest';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import express, { Express } from 'express';

import { TopicService } from '../../src/services/topic.service';

import { TOPICS_ERROR_ENUM } from '../../src/enums/errors.enum';

import { TopicController } from '../../src/apis/topic.api';
import { before } from 'mocha';
import { dbConnection } from '../../src/connexion';
import { ErrorsInterceptor } from '../../src/middlewares/errors.interceptor';

chai.use(sinonChai);

describe('Topics Apis', () => {
  const testServer = (configure: (express: Express) => void): Express => {
    const app = express();
    app.use(express.json());
    configure(app);
    app.use(ErrorsInterceptor);
    return app;
  };

  const app: Express = testServer((app: Express) => {
    app.use('/', TopicController);
  });

  before(async () => {
    await dbConnection();
  });

  it('Should GET all topics', async () => {
    await request(app)
      .get('/')
      .expect(200)
      .then((response: Response) => {
        expect(response.body).length(3);
        expect(response.body[0].date).to.be.equal('2022-10-06T08:18:59.000Z');
      });
  });

  it('Should GET a 404 Error"', async () => {
    sinon.stub(TopicService.prototype, 'getTopics').resolves([]);

    await request(app)
      .get('/')
      .expect(404)
      .then((response: Response) => {
        expect(response.body.error).to.be.equal(
          TOPICS_ERROR_ENUM.TOPICS_NOT_FOUND,
        );
      });

    sinon.restore();
  });
});
