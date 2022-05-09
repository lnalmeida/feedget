import { prisma } from "./prisma";
import express, {Request, Response} from "express";
import { transport } from './sendMail';


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.post("/feedbacks", async (req: Request, res: Response) => {
    const {type, comment, screenshot} = req.body;
    
   const newFeedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }, select: {id: true},
    });
   
    await transport.sendMail({
        from: "Suporte Feedget <suporte@feedget.com.br>",
        to: "Luiz Nunes <l.n.almeida.ti2@gmail.com>",
        subject: "Novo feedback",
        html: [
            `<div style"font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<h1>Novo feedback</h1>`,
            `<p>ID: ${newFeedback.id}</p>`,
            `<p>Tipo de feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `<p>Screenshot: ${screenshot}</p>`,
            `</div>`,
        ].join("\n"),
    });

    res.status(201).send(`Feedback criado com sucesso!
    ID: ${newFeedback.id}`);
});

app.listen(port, () => {
    console.log(`Server rodando ona porta ${port}`);
});