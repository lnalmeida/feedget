import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacksRepository";

interface SubmitFeedbacksServiceDTO {
    type: string;
    comment: string;
    screenshot?: string;
};

export class SubmitFeedbackService {
    constructor(
        private feedbackRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ) { }

    async execute(data: SubmitFeedbacksServiceDTO) {
        const { type, comment, screenshot } = data;

        if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format');
        }

        if(!type) {
            throw new Error('Type is required');
        }

        if(!comment) {
            throw new Error('Comment is required');
        }

        await this.feedbackRepository.create({
                type,
                comment,
                screenshot,
        });
        
        await this.mailAdapter.sendMail({
            subject: "Novo Feedback do Usuário",
            body: [
                `<div style"font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<h1>Novo feedback</h1>`,
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `<p>Screenshot: ${screenshot}</p>`,
                `</div>`,
            ].join("\n"),
        });
    }

}