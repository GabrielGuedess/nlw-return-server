export interface SendMailData {
    from: string,
    to: string,
    subject: string,
    html: string;
}

export interface MailAdapter {
  sendMail(data: SendMailData): Promise<void>;
}