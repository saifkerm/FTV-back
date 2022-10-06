import mongoose, {Document, Model} from 'mongoose';
import { ITeam } from "./teams.model";
const { Schema } = mongoose;

export interface ILeague extends Document {
    name: string;
    sport: string;
    teams: ITeam[];
}

export const LeagueSchema = new Schema<ILeague>({
    name: String,
    sport: String,
    teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }]
});

export const LeagueModel: Model<ILeague> = mongoose.model<ILeague>('League', LeagueSchema);