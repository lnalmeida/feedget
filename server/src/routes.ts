import { Router, Request, Response } from 'express'
import { SubmitFeedbackService } from './services/submitFeedbackService';
import { PrismaFeedbacksRepository } from './repositories/prismaFeedbackRepository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailerMailAdapter';

export const routes = Router()



routes.post("/feedbacks", async (req: Request, res: Response) => {
    const {type, comment, screenshot} = req.body;
    
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submitFeedbackService = new SubmitFeedbackService(
        prismaFeedbacksRepository,
        nodemailerMailAdapter,
    );

    await submitFeedbackService.execute({
        type,
        comment,
        screenshot
    });
   
    res.status(201).send(`Feedback criado com sucesso!`);
});

