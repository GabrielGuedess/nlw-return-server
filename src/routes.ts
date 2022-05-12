import { Router } from 'express';
import nodemailer from 'nodemailer';

import { SubmitFeedbackController } from './useCases/submitFeedback/SubmitFeedbackController';

export const routes = Router();

routes.post('/feedbacks', new SubmitFeedbackController().handle);
