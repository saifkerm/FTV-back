import { ITopics, TopicModel } from '../models/topicModel';

export class TopicService {
  /**
   * Find all `published` topics,
   *
   * @returns {ITopics[]} return arrays of topics
   */
  async getTopics(): Promise<ITopics[]> {
    return TopicModel.find({
      status: true,
    })
      .sort({ date: 1 })
      .lean();
  }
}
