import { MailAdapter, SendMailData } from '../mailAdapter';

import { transport } from '../../config/transportMail';

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ from, to, subject, html }: SendMailData): Promise<void> {
    await transport.sendMail({
      from,
      to,
      subject,
      html,
    });
  }
}
