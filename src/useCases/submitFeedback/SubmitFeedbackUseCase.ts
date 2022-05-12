import { FeedbacksRepository } from '../../repositories/feedbacksRepository';
import { MailAdapter } from '../../adapters/mailAdapter';

export interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute({
    type,
    comment,
    screenshot,
  }: SubmitFeedbackUseCaseRequest): Promise<void> {
    if(!type || !comment) {
      throw new Error('Type and comment are required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      from: 'Equipe Feedback <oi@Feedback.com>',
      to: 'Gabriel Guedes <gabrielrguedess@gmail.com>',
      subject: 'Novo feedback',
      html: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`,
      ].join('\n'),
    });
  }
}
