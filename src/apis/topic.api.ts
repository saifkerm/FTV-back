import { NextFunction, Request, Response, Router } from 'express';
import { NotFoundException } from '../utils/exceptions';
import { TopicService } from '../services/topic.service';
import { ITopics } from '../models/topicModel';
import { TOPICS_ERROR_ENUM } from '../enums/errors.enum';

const TopicController = Router();

/**
 * Instance de notre service
 */
const newsService = new TopicService();

/**
 * Get all news API
 */
TopicController.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const news: ITopics[] = await newsService.getTopics();

      if (!news.length) {
        throw new NotFoundException(TOPICS_ERROR_ENUM.TOPICS_NOT_FOUND);
      }

      return res.status(200).json(news);
    } catch (error) {
      next(error);
    }
  },
);

export { TopicController };
