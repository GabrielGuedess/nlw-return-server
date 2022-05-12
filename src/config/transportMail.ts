import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '43878c0d6e5eb4',
    pass: '5507e5975d98c6',
  },
});