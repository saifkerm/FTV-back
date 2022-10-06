import { ObjectId } from "mongodb";

export const LEAGUE_ID: any = new ObjectId('5d2cdcf7da07b95bb8f16ed1');

export const LEAGUE_NAME: string = 'leag';
export const LEAGUE_UNDEFINED_NAME: string = 'test';

export const LEAGUE_RESPONSE = {
    _id: '5d2cdcf7da07b95bb8f16ed1',
    name: 'English Premier League'
};

export const LEAGUE_WITH_TEAM_RESPONSE = {
    _id: '5d2cdcf7da07b95bb8f16ed1',
    name: 'English Premier League',
    sport: 'soccer',
    teams: [
        {
            _id: '5d2d01fdda07b95bb8f16f0a',
            name: 'Arsenal',
            thumbnail: 'https://www.thesportsdb.com//images//media//team//badge//a1af2i1557005128.png'
        },
        {
            _id: '5d2d02d7da07b95bb8f16f2a',
            name: 'Manchester City',
            thumbnail: 'https://www.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png'
        },
        {
            _id: '5d2d8f60da07b95bb8f17170',
            name: 'Chelsea',
            thumbnail: 'https://www.thesportsdb.com/images/media/team/badge/yvwvtu1448813215.png'
        }
    ]
};