import { TeamsModel } from "../models/teams.model";
import { ILeague, LeagueModel } from "../models/leagues.model";

export class LeaguesService {

    /**
     * Find all leagues with their teams
     *
     * @returns {ILeague[]} return arrays of leagues with their teams
     */
    async findAll(): Promise<ILeague[]> {
        const leagues: ILeague[] = await LeagueModel
            .find()
            .populate({
                path: 'teams',
                model: TeamsModel,
            })
            .lean();

        return leagues;
    }

    /**
     * Find League by _id
     *
     * @param {string} _id of the league
     *
     * @returns {ILeague | null} return league, if not found null
     */
    async findLeaguesById(_id: string): Promise<ILeague | null> {
        const league: ILeague | null = await LeagueModel.findById(_id).populate({
            path: 'teams',
            model: TeamsModel,
            select: '_id name thumbnail'
        });

        return league;
    }

    /**
     * Find Leagues by name,
     * Case insensitivity to match upper and lower cases.
     *
     * @param {string} name of the league
     *
     * @returns {ILeague | null} return league, if not found null
     */
    async findLeaguesByName(name: string): Promise<ILeague[]> {
        const leagues: ILeague[] = await LeagueModel
            .find({name: { $regex: name, $options: 'i' }}, 'name');

        return leagues;
    }
}
