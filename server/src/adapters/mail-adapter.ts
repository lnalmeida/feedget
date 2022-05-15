export interface Mail {
    subject: string;
    body: string;
}
export interface MailAdapter {
    sendMail(mail: Mail): Promise<void>;
}
