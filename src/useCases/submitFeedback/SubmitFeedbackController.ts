import { Request, Response } from 'express';
import { NodemailerMailAdapter } from '../../adapters/nodemailer/nodemailerMailAdapter';
import { PrismaFeedbacksRepository } from '../../repositories/prisma/PrismaFeedbacksRepository';
import { SubmitFeedbackUseCase } from './SubmitFeedbackUseCase';

export class SubmitFeedbackController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { type, comment, screenshot } = req.body;

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      new PrismaFeedbacksRepository(),
      new NodemailerMailAdapter()
    );

    await submitFeedbackUseCase.execute({ type, comment, screenshot });

    return res.status(201).send();
  }
}
