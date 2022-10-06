import {NextFunction, Request, Response, Router} from 'express'
import { NotFoundException } from '../utils/exceptions';
import { LeaguesService } from "../services/leagues.service";
import { ILeague } from "../models/leagues.model";
import { FTV_ERROR_ENUM } from "../enums/errors.enum";

const LeagueController = Router();

/**
 * Instance de notre service
 */
const leagueService = new LeaguesService();

/**
 * Get all leagues
 */
LeagueController.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const leagues: ILeague[] = await leagueService.findAll();

        if (!leagues.length) {
            throw new NotFoundException(FTV_ERROR_ENUM.LEAGUES_NOT_FOUND);
        }

        return res.status(200).json(leagues);
    } catch (error) {
        next(error);
    }
});

/**
 * Get league by filters
 */
LeagueController.get('/search/:name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.params;

        const filteredLeagues: ILeague[] | null = await leagueService.findLeaguesByName(name);

        if (filteredLeagues.length === 0) {
            throw new NotFoundException(FTV_ERROR_ENUM.LEAGUES_NOT_FOUND);
        }

        return res.status(200).json(filteredLeagues);
    } catch (error) {
        next(error);
    }
});

/**
 * Get league by _id
 */
LeagueController.get('/_id/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const league: ILeague | null = await leagueService.findLeaguesById(id);

        if (!league) {
            throw new NotFoundException(FTV_ERROR_ENUM.FTV_NOT_FOUND);
        }

        return res.status(200).json(league);
    } catch (error) {
        next(error);
    }
});

/**
 * On expose notre controller pour l'utiliser dans `src/index.ts`
 */
export { LeagueController };