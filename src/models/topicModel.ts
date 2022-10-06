import { Document, Schema, Model, model } from 'mongoose';

export interface ITopics extends Document {
  text: string;
  date: Date;
  author: string;
  status: boolean;
}

export const TopicSchema = new Schema<ITopics>({
  text: { type: Schema.Types.String },
  date: { type: Schema.Types.Date },
  author: { type: Schema.Types.String },
  status: { type: Schema.Types.Boolean },
});

export const TopicModel: Model<ITopics> = model<ITopics>('Topic', TopicSchema);
