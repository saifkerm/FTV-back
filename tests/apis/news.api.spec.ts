import request from "supertest";
import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import sinon from 'sinon';
import { Express } from "express";
import { afterEach } from "mocha";

import { LeaguesService } from "../../src/services/leagues.service";

import { NEWS_ERROR_ENUM } from "../../src/enums/errors.enum";
import {
    LEAGUE_ID,
    LEAGUE_NAME,
    LEAGUE_RESPONSE,
    LEAGUE_UNDEFINED_NAME,
    LEAGUE_WITH_TEAM_RESPONSE
} from "../mocks/leagues.mock";
import { LeagueController } from "../../src/apis/leagues.api";
import { testServer } from "../test";

chai.use(sinonChai);

describe('Leagues Apis',  () => {
    const app: Express = testServer((app: Express) => {
        app.use('/', LeagueController);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('/leagues API', async () => {
        it('Should GET all leagues', async () => {
            await request(app)
                .get("/")
                .expect(200)
                .then((response: any) => {
                    expect(response._body).length(3);
                });
        });

        it('Should GET a 404 Error"', async () => {
            sinon.stub(LeaguesService.prototype, 'findAll').resolves([]);

             request(app)
                .get("/")
                .expect(404)
                .then((response: any) => {
                    expect(response._body.error).to.be.equal(NEWS_ERROR_ENUM.LEAGUES_NOT_FOUND)
                });
        });
    });

    describe('/leagues/search/:name API', async () => {

        it('Should GET league by name', async () => {
            await request(app)
                .get(`/search/${LEAGUE_NAME}`)
                .expect(200)
                .then((response: any) => {
                    const body = response._body[0];
                    expect(body).to.be.deep.equal(LEAGUE_RESPONSE);
                });
        });

        it('Should GET a 404 Error', async () => {
            sinon.stub(LeaguesService.prototype, 'findLeaguesByName').resolves([]);

            await request(app)
                .get(`/search/${LEAGUE_UNDEFINED_NAME}`)
                .expect(404)
                .then((response: any) => {
                    expect(response._body.error).to.be.equal(NEWS_ERROR_ENUM.LEAGUES_NOT_FOUND)
                });
        });
    });

    describe('/leagues/_id/:id API', async () => {

        it('Should GET league by _id', async () => {
            await request(app)
                .get(`/_id/${LEAGUE_ID}`)
                .expect(200)
                .then((response: any) => {
                    const body = response._body;
                    expect(body).to.be.deep.equal(LEAGUE_WITH_TEAM_RESPONSE);
                });
        });

        it('Should GET a 404 Error', async () => {
            sinon.stub(LeaguesService.prototype, 'findLeaguesById').resolves(null);

            await request(app)
                .get(`/_id/${LEAGUE_ID}`)
                .expect(404)
                .then((response: any) => {
                    expect(response._body.error).to.be.equal(NEWS_ERROR_ENUM.FTV_NOT_FOUND)
                });
        });
    });
});