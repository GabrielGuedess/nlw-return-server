import { SubmitFeedbackUseCase } from './SubmitFeedbackUseCase';

let SubmitFeedback: SubmitFeedbackUseCase;

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe('SubmitFeedbackUseCase', () => {
  beforeEach(() => {
    SubmitFeedback = new SubmitFeedbackUseCase(
      { create: createFeedbackSpy },
      { sendMail: sendMailSpy }
    );
  });

  it('should be able to submit a feedback', async () => {
    await expect(
      SubmitFeedback.execute({
        type: 'BUG',
        comment: 'Example comment',
        screenshot: 'data:image/png;base64,test.jpg',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit without type', async () => {
    await expect(
      SubmitFeedback.execute({
        type: '',
        comment: 'Example comment',
        screenshot: 'data:image/png;base64,test.jpg',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit without comment', async () => {
    await expect(
      SubmitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,test.jpg',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit with invalid screenshot', async () => {
    await expect(
      SubmitFeedback.execute({
        type: 'BUG',
        comment: 'Example comment',
        screenshot: 'test.jpg',
      })
    ).rejects.toThrow();
  });
});
