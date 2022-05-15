
import { Mail, MailAdapter } from "../mail-adapter";
import nodemailer from 'nodemailer';


export const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user:"e763e11683289a",
      pass: "7f2f35568cdee1",
    }
  });
  

export class NodemailerMailAdapter implements MailAdapter {

   async sendMail(mail: Mail): Promise<void> {
        const { subject, body } = mail;
        await transport.sendMail({
            from: "Suporte Feedget <suporte@feedget.com.br>",
            to: "Luiz Nunes <l.n.almeida.ti2@gmail.com>",
            subject: subject,
            html: body, 
        });
    }
}

