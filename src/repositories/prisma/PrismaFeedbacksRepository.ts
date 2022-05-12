import { FeedbackCreateData, FeedbacksRepository } from "../feedbacksRepository";

import { prisma } from "../../prisma";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData): Promise<void> {
    await prisma.feedBack.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}